import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Controller('modules')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post(":moduleId/assignment")
  createAssignment(@Param("moduleId") moduleId: number, @Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.createAssignment(moduleId, createAssignmentDto)
  }

  @Get(":moduleId/results")
  getResults(@Param("moduleId") moduleId: number) {
    return this.assignmentsService.getResults()
  }
}
