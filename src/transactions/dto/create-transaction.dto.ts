import { IsDateString, IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';
import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
  @IsNotEmpty()
  description: string;

  @IsNumberString()
  amount: string;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNotEmpty()
  category: string;

  @IsDateString()
  date: string;
}
