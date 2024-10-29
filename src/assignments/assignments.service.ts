import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Assignment } from './entities/assignment.entity'
import { Modules } from '../module/entities/module.entity'
import { CreateAssignmentDto } from './dto/create-assignment.dto'
import { Result } from '../results/entities/result.entity'

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentsRepository: Repository<Assignment>,
    @InjectRepository(Result)
    private resultsRepository: Repository<Result>,
    @InjectRepository(Modules)
    private modulesRepository: Repository<Modules>
  ) {}

  async createAssignment(moduleId: number, createAssignmentDto: CreateAssignmentDto): Promise<any> {
    const module = await this.modulesRepository.findOne({ where: { id: moduleId } })
    if (!module) {
      throw new NotFoundException("bunday id li modul yo'q")
    }

    const duplicateAssignment = await this.assignmentsRepository.findOne({ where: { title: createAssignmentDto.title } })
    if (duplicateAssignment) {
      throw new BadRequestException("Bu topshiriq mavjud")
    }

    try {
      const assignment = this.assignmentsRepository.create({ ...createAssignmentDto, lessonId: moduleId })
      await this.assignmentsRepository.save(assignment)
      return { message: "muvaffaqiyatli yaratildi", assignment }
    } catch (error) {
      throw new BadGatewayException("yaratishda xato")
    }
  }

  async getResults(): Promise<any> {
    try {
      const results = await this.resultsRepository.find()
      return results.length > 0 ? results : []
    } catch (error) {
      throw new BadGatewayException("qandaydir xato")
    }
  }
}
