import { Module } from '@nestjs/common';
import { ModulesService } from './module.service';
import { ModulesController } from './module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modules } from './entities/module.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Modules, Lesson])],
  controllers: [ModulesController],
  providers: [ModulesService]
})
export class ModulesModule {}
