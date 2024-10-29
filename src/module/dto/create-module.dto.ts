import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModuleDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsString()
  description: string
}
