import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: "Javascript",
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [TypeOrmModule]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        "auth/update-user/:id",
        "auth/delete-user/:id",
        "auth/users/all",
        "courses/create",
        "courses/update/:id",
        "courses/delete/:id",
        "courses/all",
        "courses/findOne/:id",
        "courses/:id/enroll",
        "modules/create",
        "modules/courses/:courseId",
        "modules/:moduleId",
        "modules/:modulesId/lessons",
        "modules/delete/:moduleId",
        "lessons/create",
        "lessons/course/:courseId",
        "assignments/:moduleId/assignment",
        "assignments/:assignmentId/submit",
        "assignments/:moduleId/assignments",
        "assignments/:moduleId/results",
        "results/create",
        "results/user/:userId",
        "results/assignment/:assignmentId"

      );

    consumer
      .apply(RoleMiddleware(['admin']))
      .forRoutes(
        "auth/update-user/:id",
        "auth/delete-user/:id",
        "courses/create",
        "courses/update/:id",
        "courses/delete/:id",
        "modules/create",
        "modules/update/:moduleId",
        "modules/delete/:moduleId",
        "lessons/create",
        "assignments/:moduleId/assignment",
        "results/create"
      );
  }
}
