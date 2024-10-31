import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
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

  async createLesson(createLessonDto: CreateLessonDto, courseId: number): Promise<any> {
    const duplicateLesson = await this.lessonsRepository.findOne({ where: { title: createLessonDto.title } })
    if (duplicateLesson) {
      throw new BadRequestException("bu dars mavjud")
    }

    const course = await this.coursesRepository.findOne({ where: { id: courseId } })
    if (!course) {
      throw new NotFoundException("bunday id li kurs yo'q")
    }

    const lesson = this.lessonsRepository.create({ ...createLessonDto, modules: course })
    await this.lessonsRepository.save(lesson)
    return { message: "dars yaratildi", lesson }
  }

  async getLessonsByCourse(courseId: number): Promise<Lesson[]> {
    const course = await this.coursesRepository.findOne({ where: { id: courseId }, relations: ['modules'] })
    if (!course) {
      throw new NotFoundException("bunday id li kurs yo'q")
    }
  
    const modules = course.modules
    const moduleIds = modules.map(module => module.id)

    return this.lessonsRepository.find({ where: { modules: In(moduleIds) } })
  }

  async getAllLessons(): Promise<Lesson[]> {
    return this.lessonsRepository.find({
      relations: ['modules', 'modules.course']
    })
  }
  
}
