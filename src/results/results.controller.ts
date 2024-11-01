import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get("user/:userId")
  getUserResults(@Param("userId") userId: number) {
    return this.resultsService.getUserResults(userId)
  }

  @Get("assignment/:assignmentId")
  getResultsByAssignment(@Param("assignmentId") assignmentId: number) {
    return this.resultsService.getResultsByAssignment(assignmentId)
  }
}
