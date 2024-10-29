import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { Assignment } from './entities/assignment.entity';
import { Result } from 'src/results/entities/result.entity';
import { ResultsModule } from 'src/results/results.module';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment]), ResultsModule],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
})
export class AssignmentsModule {}
