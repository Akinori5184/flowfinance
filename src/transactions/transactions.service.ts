import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateTransactionDto) {
    const data = {
      description: dto.description,
      amount: new Prisma.Decimal(dto.amount),
      type: dto.type,
      category: dto.category,
      date: new Date(dto.date),
      user: {
        connect: { id: userId },
      },
    };

    return this.prisma.transaction.create({ data });
  }

  findAll(userId: number, month?: string) {
    const where: any = { userId };

    if (month) {
      const [year, monthNumber] = month.split('-').map(Number);
      const start = new Date(year, monthNumber - 1, 1);
      const end = new Date(year, monthNumber, 1);

      where.date = {
        gte: start,
        lt: end,
      };
    }

    return this.prisma.transaction.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }

  remove(userId: number, id: number) {
    return this.prisma.transaction.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }

  async summary(userId: number, month?: string) {
    const where: any = { userId };

    if (month) {
      const [year, monthNumber] = month.split('-').map(Number);
      const start = new Date(year, monthNumber - 1, 1);
      const end = new Date(year, monthNumber, 1);

      where.date = {
        gte: start,
        lt: end,
      };
    }

    const rows = await this.prisma.transaction.groupBy({
      by: ['type', 'category'],
      where,
      _sum: {
        amount: true,
      },
    });

    return rows.map((row) => ({
      type: row.type,
      category: row.category,
      total: Number(row._sum.amount ?? 0),
    }));
  }
}
