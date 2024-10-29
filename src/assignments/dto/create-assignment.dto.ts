import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber()
  score: number
}
