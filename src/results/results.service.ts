import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { User } from '../auth/entities/user.entity';
import { Assignment } from '../assignments/entities/assignment.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private resultsRepository: Repository<Result>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Assignment)
    private assignmentsRepository: Repository<Assignment>
  ) {}

  async getUserResults(userId: number): Promise<Result[]> {
    const user = await this.usersRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException("bunday id li user mavjud emas")
    }

    return this.resultsRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "assignment"]
    })
  }

  async getResultsByAssignment(assignmentId: number): Promise<Result[]> {
    return this.resultsRepository.find({
      where: { assignment: { id: assignmentId } },
      relations: ["user", "assignment"]
    })
  }
}
