import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, dto: CreateBudgetDto) {
    return this.prisma.budget.create({
      data: {
        category: dto.category,
        monthlyLimit: new Prisma.Decimal(dto.monthlyLimit),
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.budget.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  remove(userId: number, id: number) {
    return this.prisma.budget.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }
}
