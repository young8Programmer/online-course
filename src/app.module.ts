import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { ModuleModule } from './module/module.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [AuthModule, AssignmentsModule, CoursesModule, LessonsModule, ModuleModule, ResultsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
