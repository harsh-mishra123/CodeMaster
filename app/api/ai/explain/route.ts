import { NextRequest, NextResponse } from 'next/server';
import { explainCode } from '@/lib/gemini';
import { prisma } from '@/lib/db';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    // 1. Safe Auth Check
    let userId: string | null = null;
    let user = null;
    try {
        const authData = await auth();
        userId = authData.userId;
        if (userId) {
            user = await currentUser();
        }
    } catch (authError) {
        console.warn('Auth check failed (proceeding as guest):', authError);
    }

    // 2. Parse Body
    let body;
    try {
        body = await request.json();
    } catch (e) {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { code, language, depth = 'intermediate', title } = body;
    if (!code) return NextResponse.json({ error: 'Code is required' }, { status: 400 });

    // 3. Generate AI Explanation
    // We await this. If it fails, the outer catch block handles it.
    // Ensure inputs are valid strings.
    const safeDepth = (typeof depth === 'string' ? depth.toLowerCase() : 'intermediate') as any;
    const safeLang = typeof language === 'string' ? language : 'javascript';
    
    // Call Gemini
    const explanation = await explainCode(code, safeLang, safeDepth);

    // 4. Save to Database (Optional - Fire & Forget)
    if (userId && user) {
        // We do NOT await this, so the user gets the response instantly.
        // We use a self-executing async function to handle the promise.
        (async () => {
            try {
                // Ensure prisma is available
                if (!prisma) return;

                // Upsert user to ensure they exist
                const email = user.emailAddresses[0]?.emailAddress;
                // Double check prisma connection to avoid crash in background
                if (!prisma.user) return; 

                const dbUser = await prisma.user.upsert({
                    where: { clerkId: userId },
                    update: {},
                    create: {
                        clerkId: userId,
                        email: email || `unknown_${userId}@example.com`,
                        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User',
                    }
                });

                // Create explanation
                await prisma.explanation.create({
                    data: {
                        userId: dbUser.id,
                        title: title || 'Code Explanation',
                        code: code.slice(0, 10000), // Limit code size
                        language: safeLang,
                        explanation: explanation.explanation + (explanation.dryRun ? `\n\n## Dry Run Execution\n${explanation.dryRun}` : ''),
                        debugTips: explanation.debugTips,
                        quizQuestions: explanation.quizQuestions,
                        tags: explanation.concepts,
                        depth: safeDepth.toUpperCase(),
                        tokensUsed: explanation.estimatedTokens
                    }
                });
            } catch (dbError) {
                console.error('Background DB Save Error:', dbError);
            }
        })();
    }

    return NextResponse.json({
        success: true,
        data: explanation
    });

  } catch (error: any) {
    console.error('API Route Critical Error:', error);
    // Return a valid JSON error so the frontend doesn't crash with "Unexpected token <"
    return NextResponse.json(
      { 
        error: 'An internal error occurred while processing your code.',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
