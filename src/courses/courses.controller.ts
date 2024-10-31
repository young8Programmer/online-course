import { Controller, Get, Post, Body, Param, Put, Delete, Query, BadRequestException } from "@nestjs/common";
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post("create")
  createCourse(@Body() createCourseDto) {
    return this.coursesService.createCourse(createCourseDto)
  }

  @Get("all")
  findAllCourses(@Query() filterDto) {
    return this.coursesService.findAllCourses(filterDto)
  }

  @Get("findOne/:id")
  findOneCourse(@Param("id") id: string) {
    const courseId = Number(id)
    if (isNaN(courseId)) {
      throw new BadRequestException("id formati xato")
    }
    return this.coursesService.findOneCourse(courseId)
  }

  @Post(":id/enroll")
  enrollUser(@Param("id") courseId: number, @Body("userId") userId: number) {
    return this.coursesService.enrollUser(courseId, userId)
  }

  @Put("update/:id")
  updateCourse(@Param("id") id: number, @Body() updateCourseDto) {
    return this.coursesService.updateCourse(id, updateCourseDto)
  }

  @Delete("delete/:id")
  removeCourse(@Param("id") id: number) {
    return this.coursesService.removeCourse(id)
  }
}
