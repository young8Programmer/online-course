import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post("create")
  createLesson(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.createLesson(createLessonDto)
  }

  @Get("course/:courseId")
  getLessonsByCourse(@Param("courseId") courseId: number) {
    return this.lessonsService.getLessonsByCourse(courseId)
  }
}
