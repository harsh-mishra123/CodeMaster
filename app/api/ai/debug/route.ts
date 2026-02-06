import { NextRequest, NextResponse } from 'next/server';
import { debugCode } from '@/lib/gemini';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    // Optional: Verify user if needed, consistent with explain route
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

    const { code, error, language } = body;
    if (!code) return NextResponse.json({ error: 'Code is required' }, { status: 400 });

    const safeLang = typeof language === 'string' ? language : 'javascript';
    const safeError = typeof error === 'string' ? error : '';

    const result = await debugCode(code, safeError, safeLang);

    return NextResponse.json({ success: true, data: result });

  } catch (error: any) {
    console.error('Debug Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
