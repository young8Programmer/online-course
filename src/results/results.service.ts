import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Result } from './entities/result.entity'
import { CreateResultDto } from './dto/create-result.dto'
import { User } from '../auth/entities/user.entity'

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private resultsRepository: Repository<Result>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async createResult(createResultDto: CreateResultDto): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { id: createResultDto.userId } })
    if (!user) {
      throw new NotFoundException(`bunday user yo'q`)
    }

    const duplicateResult = await this.resultsRepository.findOne({ where: { score: createResultDto.score, userId: createResultDto.userId } })
    if (duplicateResult) {
      throw new BadRequestException("Bu natija mavjud")
    }

    const result = this.resultsRepository.create(createResultDto)
    await this.resultsRepository.save(result)
    return { message: "natija yaratildi", result }
  }

  async getUserResults(userId: number): Promise<Result[]> {
    const user = await this.usersRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException("bunday id li user mavjud emas")
    }

    return this.resultsRepository.find({ where: { userId } })
  }
}
