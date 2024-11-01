import { Controller, Get, Post, Body, Param, Delete, NotFoundException, ParseIntPipe } from "@nestjs/common"
import { AssignmentsService } from './assignments.service'
import { CreateAssignmentDto } from './dto/create-assignment.dto'
import { CreateResultDto } from "src/results/dto/create-result.dto"

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post(":moduleId/assignment")
  createAssignment(
    @Param("moduleId") moduleId: number, 
    @Body() createAssignmentDto: CreateAssignmentDto
  ) {
    return this.assignmentsService.createAssignment(moduleId, createAssignmentDto)
  }

  @Post(":assignmentId/submit")
  submitResult(
    @Param("assignmentId") assignmentId: number, 
    @Body() resultDto: CreateResultDto
  ) {
    return this.assignmentsService.submitResult(assignmentId, resultDto)
  }

  @Get(":moduleId/assignments")
  getAssignments(@Param("moduleId") moduleId: number) {
    return this.assignmentsService.getAssignments(moduleId)
  }

  @Delete('delete/:id')
  async deleteAssignment(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    const message = await this.assignmentsService.deleteAssignment(id)
    return { message }
  }
}
