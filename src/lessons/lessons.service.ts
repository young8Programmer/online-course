import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>
  ) {}

  async createLesson(createLessonDto: CreateLessonDto): Promise<any> {
    const lesson = this.lessonsRepository.create(createLessonDto)
    await this.lessonsRepository.save(lesson)
    return { message: "Dars muvaffaqiyatli yaratildi", lesson }
  }

  async getLessonsByCourse(courseId: number): Promise<Lesson[]> {
    return this.lessonsRepository.find({ where: { courseId } })
  }
}
