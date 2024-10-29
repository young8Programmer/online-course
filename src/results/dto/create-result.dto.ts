import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateResultDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number

  @IsNotEmpty()
  @IsNumber()
  assignmentId: number

  @IsNotEmpty()
  @IsNumber()
  score: number
}
