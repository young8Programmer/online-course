import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string; // Modul tavsifi
}
