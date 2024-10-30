import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLessonDto {
  @IsNotEmpty({ message: "title bo'sh bo'lmasligi kerak" })
  title: string

  @IsOptional()
  content?: string

  @IsNotEmpty({ message: "kurs id bo'sh bo'lmasligi kerak" })
  courseId: number
}
