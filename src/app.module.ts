import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './module/module.module';
import { LessonsModule } from './lessons/lessons.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "dev",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "n99",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    AuthModule,
    CoursesModule,
    ModulesModule,
    LessonsModule,
    AssignmentsModule,
    ResultsModule,
  ]
})
export class AppModule {}
