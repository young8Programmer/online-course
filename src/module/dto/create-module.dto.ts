import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateModuleDto {
  @IsNotEmpty({ message: "maydonni to'ldiring" })
  title: string

  @IsOptional()
  description?: string

  @IsNotEmpty({ message: "maydon bo'sh bo'lmasin" })
  courseId: number
}
