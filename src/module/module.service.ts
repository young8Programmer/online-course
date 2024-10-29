import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Modules } from './entities/module.entity'
import { Lesson } from '../lessons/entities/lesson.entity'
import { CreateModuleDto } from './dto/create-module.dto'

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Modules)
    private modulesRepository: Repository<Modules>,
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>
  ) {}

  async createModule(createModuleDto: CreateModuleDto): Promise<any> {
    const existingModule = await this.modulesRepository.findOne({ where: { title: createModuleDto.title } })

    if (existingModule) {
      throw new NotFoundException("Bunday modul mavjud")
    }
    const module = this.modulesRepository.create(createModuleDto)
    await this.modulesRepository.save(module)
    return { message: "Modul muvaffaqiyatli yaratildi", module }
  }

  async findAllModules(courseId: number): Promise<Modules[]> {
    return this.modulesRepository.find({ where: { id:courseId } })
  }

  async findOneModule(moduleId: number): Promise<Modules> {
    const module = await this.modulesRepository.findOne({ where: { id: moduleId } })
    if (!module) {
      throw new NotFoundException("Modul topilmadi")
    }
    return module
  }

  async findLessonsByModule(moduleId: number): Promise<Lesson[]> {
    return this.lessonsRepository.find({ where: { modules: { id: moduleId } } })
  }

  async updateModule(moduleId: number, updateModuleDto: CreateModuleDto): Promise<any> {
    const module = await this.modulesRepository.findOne({ where: { id: moduleId } })
    if (!module) {
      throw new NotFoundException("Modul topilmadi")
    }
    Object.assign(module, updateModuleDto)
    await this.modulesRepository.save(module)
    return { message: "Modul yangilandi", module }
  }

  async removeModule(moduleId: number): Promise<any> {
    const module = await this.modulesRepository.findOne({ where: { id: moduleId } })
    if (!module) {
      throw new NotFoundException("Modul topilmadi")
    }
    await this.modulesRepository.remove(module)
    return { message: "Modul o'chirildi" }
  }
}
