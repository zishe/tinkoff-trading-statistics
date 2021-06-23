import { PrismaClient } from '@trade-reports/prisma-client';

export interface Context {
  prisma: PrismaClient;
}