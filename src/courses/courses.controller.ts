import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post("create")
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get("all")
  findAll() {
    return this.coursesService.findAll();
  }

  @Get("findOne/:id")
  findOne(@Param("id") id: number) {
    return this.coursesService.findOne(id);
  }

  @Put("update/:id")
  update(@Param("id") id: number, @Body() updateCourseDto: CreateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: number) {
    return this.coursesService.remove(id);
  }
}
