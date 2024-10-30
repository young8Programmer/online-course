import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Assignment } from "./entities/assignment.entity";
import { Modules } from "../module/entities/module.entity";
import { CreateAssignmentDto } from "./dto/create-assignment.dto";
import { Result } from "../results/entities/result.entity";
import { Lesson } from "../lessons/entities/lesson.entity";
import { CreateResultDto } from "src/results/dto/create-result.dto";

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentsRepository: Repository<Assignment>,
    @InjectRepository(Result)
    private resultsRepository: Repository<Result>,
    @InjectRepository(Modules)
    private modulesRepository: Repository<Modules>,
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>
  ) {}

  async createAssignment(moduleId: number, createAssignmentDto: CreateAssignmentDto): Promise<any> {
    const module = await this.modulesRepository.findOne({
      where: { id: moduleId },
      relations: ["lessons"]
    })
    
    if (!module) {
      throw new NotFoundException("bunday id li modul yo'q")
    }

    const lesson = await this.lessonsRepository.findOne({ where: { id: createAssignmentDto.lessonId } })
    
    if (!lesson) {
      throw new NotFoundException("bunday dars topilmadi")
    }

    const assignment = this.assignmentsRepository.create({ ...createAssignmentDto, lesson })
    await this.assignmentsRepository.save(assignment)
    
    return { message: "dars yaratildi", assignment }
  }

  async submitResult(assignmentId: number, resultDto: CreateResultDto): Promise<any> {
    const assignment = await this.assignmentsRepository.findOne({ where: { id: assignmentId } })
    
    if (!assignment) {
      throw new NotFoundException("bunday topshiriq mavjud emas")
    }

    const result = this.resultsRepository.create({ ...resultDto, assignment })
    await this.resultsRepository.save(result)
    
    return { message: "natija saqlandi", result }
  }

  async getResultsByModule(moduleId: number): Promise<any> {
    return this.resultsRepository.find({
      where: { assignment: { lesson: { modules: { id: moduleId } } } },
      relations: ["assignment"]
    })
  }

  async getAssignments(moduleId: number): Promise<Assignment[]> {
    return this.assignmentsRepository.find({
      where: { lesson: { modules: { id: moduleId } } },
      relations: ["lesson"]
    })
  }
}
