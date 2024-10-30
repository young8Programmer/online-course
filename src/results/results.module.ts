import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { Result } from './entities/result.entity';
import { User } from 'src/auth/entities/user.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { AssignmentsModule } from 'src/assignments/assignments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result, User, Assignment]),
    forwardRef(() => AssignmentsModule)
  ],
  controllers: [ResultsController],
  providers: [ResultsService],
  exports: [TypeOrmModule]
})
export class ResultsModule {}
