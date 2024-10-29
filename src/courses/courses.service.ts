import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const course = this.courseRepository.create(createCourseDto);
    return await this.courseRepository.save(course);
  }

  async findAll() {
    return await this.courseRepository.find();
  }

  async findOne(id: number) {
    return await this.courseRepository.findOneBy({ id });
  }

  async update(id: number, updateCourseDto: CreateCourseDto) {
    await this.courseRepository.update(id, updateCourseDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.courseRepository.delete(id);
    return "o'chirildi"
  }
}
