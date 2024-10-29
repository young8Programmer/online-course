import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Lesson } from './entities/lesson.entity'
import { Course } from '../courses/entities/course.entity'
import { CreateLessonDto } from './dto/create-lesson.dto'

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>
  ) {}

  async createLesson(createLessonDto: CreateLessonDto): Promise<any> {
    const duplicateCourse = await this.lessonsRepository.findOne({ where: { title: createLessonDto.title } })
    if (duplicateCourse) {
      throw new BadRequestException("bu dars mavjud")
    }

    const lesson = this.lessonsRepository.create(createLessonDto)
    await this.lessonsRepository.save(lesson)
    return { message: "dars yaratildi", lesson }
  }

  async getLessonsByCourse(courseId: number): Promise<Lesson[]> {
    const course = await this.coursesRepository.findOne({ where: { id: courseId } })
    if (!course) {
      throw new NotFoundException("bunday id li kurs yo'q")
    }

    return this.lessonsRepository.find({ where: { courseId } })
  }
}
