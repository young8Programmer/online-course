import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modules } from './entities/module.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Modules)
    private modulesRepository: Repository<Modules>,
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>
  ) {}

  async createModule(createModuleDto: CreateModuleDto): Promise<any> {
    const { courseId, ...moduleData } = createModuleDto

    const existingModule = await this.modulesRepository.findOne({ where: { title: moduleData.title } })
    if (existingModule) {
      throw new NotFoundException("bunday modul mavjud")
    }

    const course = await this.coursesRepository.findOne({ where: { id: courseId } })
    if (!course) {
      throw new NotFoundException("bunday id li kurs yo'q")
    }

    const module = this.modulesRepository.create({ ...moduleData, course })
    await this.modulesRepository.save(module)
    return { message: "modul yaratildi", module }
  }

  async findAllModules(courseId: number): Promise<Modules[]> {
    const course = await this.coursesRepository.findOne({ where: { id: courseId } })
    if (!course) {
      throw new NotFoundException("bunday id li kurs yo'q")
    }

    return this.modulesRepository.find({
      where: { course: { id: courseId } },
      relations: ['course', 'lessons']
    })
  }

  async findOneModule(moduleId: number): Promise<Modules> {
    const module = await this.modulesRepository.findOne({
      where: { id: moduleId },
      relations: ['course', 'lessons']
    })
    if (!module) {
      throw new NotFoundException("modul topilmadi")
    }
    return module
  }

  async findLessonsByModule(moduleId: number): Promise<Lesson[]> {
    const module = await this.modulesRepository.findOne({ where: { id: moduleId } })
    if (!module) {
      throw new NotFoundException("bunday id li modul yo'q")
    }

    return this.lessonsRepository.find({
      where: { modules: { id: moduleId } },
      relations: ['modules']
    })
  }

  async updateModule(moduleId: number, updateModuleDto: CreateModuleDto): Promise<any> {
    const module = await this.modulesRepository.findOne({ where: { id: moduleId } })
    if (!module) {
      throw new NotFoundException("modul topilmadi")
    }

    Object.assign(module, updateModuleDto)
    await this.modulesRepository.save(module)
    return { message: "modul yangilandi", module }
  }

  async removeModule(moduleId: number): Promise<any> {
    const module = await this.modulesRepository.findOne({ where: { id: moduleId } })
    if (!module) {
      throw new NotFoundException("modul topilmadi")
    }

    await this.modulesRepository.remove(module)
    return { message: "modul o'chirildi" }
  }
}
