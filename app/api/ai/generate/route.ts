import { NextRequest, NextResponse } from 'next/server';
import { generateCode } from '@/lib/gemini';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    // Optional: Verify user if needed
    try {
        await auth();
    } catch (e) {
        console.warn('Auth check warning:', e);
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { description, language } = body;
    if (!description) return NextResponse.json({ error: 'Description is required' }, { status: 400 });

    const safeLang = typeof language === 'string' ? language : 'javascript';

    const result = await generateCode(description, safeLang);

    return NextResponse.json({ success: true, data: result });

  } catch (error: any) {
    console.error('Generate Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
