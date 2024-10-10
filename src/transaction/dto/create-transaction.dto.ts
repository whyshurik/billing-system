import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "../../user/user.entity";
export class CreateTransactionDto {
  @IsString()
  readonly amount: number;

  @IsNumber({}, {message: 'Amount must be greater than or equal to 0'})
  @IsNotEmpty({message: 'Amount is required'})
  readonly receiver: string;

}