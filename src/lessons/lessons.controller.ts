import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post("create/:courseId")
  createLesson(@Param('courseId') courseId: number, @Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.createLesson(createLessonDto, courseId);
  }

  @Get("course/:courseId")
  getLessonsByCourse(@Param("courseId") courseId: number) {
    return this.lessonsService.getLessonsByCourse(courseId);
  }

  @Get("all")
  async getAllLessons() {
    return this.lessonsService.getAllLessons();
  }

  @Put("update/:id")
  updateLesson(@Param('id') id: number, @Body() updateLessonDto: CreateLessonDto) {
    return this.lessonsService.updateLesson(id, updateLessonDto)
  }

  @Delete("delete/:id")
  deleteLesson(@Param('id') id: number) {
    return this.lessonsService.deleteLesson(id)
  }
}
