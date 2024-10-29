import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common'
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

  @Get('findOne/:id')
  findOneCourse(@Param('id') id: number) {
    return this.coursesService.findOneCourse(id)
  }

  @Post(':id/enroll')
  enrollUser(@Param('id') courseId: number, @Body('userId') userId: number) {
    return this.coursesService.enrollUser(courseId, userId)
  }

  @Put('update/:id')
  updateCourse(@Param('id') id: number, @Body() updateCourseDto) {
    return this.coursesService.updateCourse(id, updateCourseDto)
  }

  @Delete('delete/:id')
  removeCourse(@Param('id') id: number) {
    return this.coursesService.removeCourse(id)
  }
}
