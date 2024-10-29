import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateLessonDto {
  @IsNotEmpty()
  @IsNumber()
  courseId: number

  @IsNotEmpty()
  @IsString()
  title: string

  @IsString()
  content: string
}
