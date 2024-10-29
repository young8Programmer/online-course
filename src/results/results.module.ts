import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { Result } from './entities/result.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result, User])],
  controllers: [ResultsController],
  providers: [ResultsService],
  exports: [TypeOrmModule]
})
export class ResultsModule {}
