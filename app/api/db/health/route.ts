import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Get database statistics
    const [userCount, explanationCount] = await Promise.all([
      prisma.user.count(),
      prisma.explanation.count(),
    ]);

    return NextResponse.json({
      status: 'healthy',
      message: 'Database connected successfully',
      timestamp: new Date().toISOString(),
      stats: {
        users: userCount,
        explanations: explanationCount,
      },
      environment: process.env.NODE_ENV,
    });
    
  } catch (error: any) {
    console.error('Database health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      message: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString(),
      stats: null,
    }, { status: 503 });
  }
}