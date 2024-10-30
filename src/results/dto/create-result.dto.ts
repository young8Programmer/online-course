import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateResultDto {
  @IsNotEmpty()
  @IsNumber()
  score: number

  @IsNotEmpty()
  @IsNumber()
  userId: number

  @IsNotEmpty()
  @IsNumber()
  assignmentId: number
}
