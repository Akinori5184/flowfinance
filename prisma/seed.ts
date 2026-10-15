import * as bcrypt from 'bcrypt';
import { PrismaClient, TransactionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'demo@flowfinance.com';
  const password = '123456';

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    console.log('Seed already executed');
    return;
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: 'Demo User',
      email,
      password: hashed,
    },
  });

  await prisma.budget.createMany({
    data: [
      { userId: user.id, category: 'Alimentação', monthlyLimit: 1500 },
      { userId: user.id, category: 'Moradia', monthlyLimit: 2200 },
      { userId: user.id, category: 'Lazer', monthlyLimit: 800 },
    ],
  });

  await prisma.transaction.createMany({
    data: [
      {
        userId: user.id,
        description: 'Salário principal',
        amount: 5200,
        type: TransactionType.INCOME,
        category: 'Salário',
        date: new Date('2026-10-01T00:00:00.000Z'),
      },
      {
        userId: user.id,
        description: 'Aluguel',
        amount: 1800,
        type: TransactionType.EXPENSE,
        category: 'Moradia',
        date: new Date('2026-10-03T00:00:00.000Z'),
      },
      {
        userId: user.id,
        description: 'Mercado',
        amount: 620,
        type: TransactionType.EXPENSE,
        category: 'Alimentação',
        date: new Date('2026-10-10T00:00:00.000Z'),
      },
      {
        userId: user.id,
        description: 'Cinema',
        amount: 180,
        type: TransactionType.EXPENSE,
        category: 'Lazer',
        date: new Date('2026-10-14T00:00:00.000Z'),
      },
    ],
  });

  console.log('Seed complete');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
