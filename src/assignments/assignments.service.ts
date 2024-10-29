import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Result } from '../results/entities/result.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentsRepository: Repository<Assignment>,
    @InjectRepository(Result)
    private resultsRepository: Repository<Result>
  ) {}

  async createAssignment(moduleId: number, createAssignmentDto: CreateAssignmentDto): Promise<any> {
    const assignment = this.assignmentsRepository.create({ ...createAssignmentDto, lessonId: moduleId });
    await this.assignmentsRepository.save(assignment)
    return { message: "Topshiriq muvaffaqiyatli yaratildi", assignment }
  }

  async getResults(): Promise<any> {
    const results = await this.resultsRepository.find()
    return results.length > 0 ? results : []
  }
}
