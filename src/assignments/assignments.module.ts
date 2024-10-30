import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { Assignment } from './entities/assignment.entity';
import { Modules } from 'src/module/entities/module.entity';
import { ResultsModule } from 'src/results/results.module';
import { LessonsModule } from 'src/lessons/lessons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment, Modules]),
    forwardRef(() => ResultsModule), LessonsModule
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  exports: [TypeOrmModule]
})
export class AssignmentsModule {}
