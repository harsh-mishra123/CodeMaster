import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
    try {
        const url = process.env.DATABASE_URL;
        
        // Use provided URL if available
        if (url) {
            return new PrismaClient({
                datasources: {
                    db: {
                        url,
                    },
                },
            });
        }
        
        // Fallback to default env loading
        return new PrismaClient();
    } catch (error) {
        console.error("Failed to initialize Prisma Client:", error);
        
        // Return a dummy object that doesn't crash on property access
        const dummyProxy = new Proxy({}, {
            get: (target, prop) => {
                if (prop === 'then') return undefined; // Promise safety
                // Warn on any method call
                return (...args: any[]) => {
                    console.warn(`Database operation '${String(prop)}' skipped (DB Connection Failed)`);
                    return Promise.resolve(null);
                };
            }
        });
        return dummyProxy as unknown as PrismaClient;
    }
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Safe test connection function
export async function testConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('Database connected successfully');
    return { success: true, message: 'Database connected' };
  } catch (error) {
    console.warn('Database connection check failed (Non-fatal):', error);
    return { success: false, message: 'Database connection failed' };
  }
}

export async function getUserByClerkId(clerkId: string) {
    try {
        return await prisma.user.findUnique({
            where: { clerkId },
            include: { _count: { select: { explanations: true } } },
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}
