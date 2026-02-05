import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Test database connection
export async function testConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connected successfully');
    return { success: true, message: 'Database connected' };
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return { success: false, message: 'Database connection failed' };
  }
}

// Get user by Clerk ID
export async function getUserByClerkId(clerkId: string) {
  try {
    return await prisma.user.findUnique({
      where: { clerkId },
      include: {
        _count: {
          select: {
            explanations: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}