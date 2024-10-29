import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modules } from './entities/module.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { CreateModuleDto } from './dto/create-module.dto';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Modules)
    private modulesRepository: Repository<Modules>,
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>
  ) {}

  async createModule(createModuleDto: CreateModuleDto): Promise<any> {
    const module = this.modulesRepository.create(createModuleDto)
    await this.modulesRepository.save(module)
    return { message: "Modul muvaffaqiyatli yaratildi", module }
  }

  async findAllModules(courseId: any): Promise<Modules[]> {
    const modules = await this.modulesRepository.find({ where: { id:courseId } })
    return modules.length > 0 ? modules : []
  }

  async findOneModule(moduleId: number): Promise<Modules> {
    const module = await this.modulesRepository.findOneBy({ id: moduleId })
    if (!module) {
      throw new NotFoundException("Modul topilmadi")
    }
    return module
  }

  async findLessonsByModule(moduleId: number): Promise<Lesson[]> {
    const lessons = await this.lessonsRepository.find({ where: { module: { id: moduleId } } })
    return lessons.length > 0 ? lessons : []
  }

  async updateModule(moduleId: number, updateModuleDto: CreateModuleDto): Promise<any> {
    const module = await this.modulesRepository.findOneBy({ id: moduleId })
    if (!module) {
      throw new NotFoundException("Modul topilmadi")
    }
    Object.assign(module, updateModuleDto)
    await this.modulesRepository.save(module)
    return { message: "Modul muvaffaqiyatli yangilandi", module }
  }

  async removeModule(moduleId: number): Promise<any> {
    const module = await this.modulesRepository.findOneBy({ id: moduleId })
    if (!module) {
      throw new NotFoundException("Modul topilmadi")
    }
    await this.modulesRepository.remove(module)
    return { message: "Modul muvaffaqiyatli o'chirildi" }
  }
}
