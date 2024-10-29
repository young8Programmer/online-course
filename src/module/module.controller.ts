import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { ModulesService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post("create")
  createModule(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.createModule(createModuleDto)
  }

  @Get("/courses/:courseId")
  findAllModules(@Param("courseId") courseId: number) {
    return this.modulesService.findAllModules(courseId)
  }

  @Get("/:moduleId")
  findOneModule(@Param("moduleId") moduleId: number) {
    return this.modulesService.findOneModule(moduleId)
  }

  @Get("/:moduleId/lessons")
  findLessonsByModule(@Param("moduleId") moduleId: number) {
    return this.modulesService.findLessonsByModule(moduleId)
  }

  @Put("update/:moduleId")
  updateModule(@Param("moduleId") moduleId: number, @Body() updateModuleDto: CreateModuleDto) {
    return this.modulesService.updateModule(moduleId, updateModuleDto)
  }

  @Delete("delete/:moduleId")
  removeModule(@Param("moduleId") moduleId: number) {
    return this.modulesService.removeModule(moduleId)
  }
}
