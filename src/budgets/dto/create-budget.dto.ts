import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateBudgetDto {
  @IsNotEmpty()
  category: string;

  @IsNumberString()
  monthlyLimit: string;
}
