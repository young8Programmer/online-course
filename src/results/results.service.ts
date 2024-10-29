import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Result } from './entities/result.entity'
import { CreateResultDto } from './dto/create-result.dto'

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private resultsRepository: Repository<Result>
  ) {}

  async createResult(createResultDto: CreateResultDto): Promise<any> {
    const result = this.resultsRepository.create(createResultDto)
    await this.resultsRepository.save(result)
    return { message: "Natija muvaffaqiyatli yaratildi", result }
  }

  async getUserResults(userId: number): Promise<Result[]> {
    return this.resultsRepository.find({ where: { userId } })
  }
}
