import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Assignment } from "./entities/assignment.entity"
import { Modules } from "../module/entities/module.entity"
import { CreateAssignmentDto } from "./dto/create-assignment.dto"
import { Result } from "../results/entities/result.entity"
import { Lesson } from "../lessons/entities/lesson.entity"
import { CreateResultDto } from "src/results/dto/create-result.dto"
import { User } from "src/auth/entities/user.entity"

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentsRepository: Repository<Assignment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

    const currentAssignment = await this.assignmentsRepository.findOne({
        where: { lesson: { id: lesson.id }, title: createAssignmentDto.title }
    })

    if (currentAssignment) {
        return { message: "Bu topshiriq mavjud", assignment: currentAssignment }
    }

    const assignment = this.assignmentsRepository.create({ ...createAssignmentDto, lesson })
    await this.assignmentsRepository.save(assignment)
    
    return { message: "dars yaratildi", assignment }
  }

  async submitResult(assignmentId: number, resultDto: CreateResultDto): Promise<any> {
    const assignment = await this.assignmentsRepository.findOne({
        where: { id: assignmentId },
        relations: ["lesson", "lesson.modules", "lesson.modules.course"]
    });

    if (!assignment) {
        throw new NotFoundException("bunday topshiriq mavjud emas")
    }

    const user = await this.userRepository.findOne({ where: { id: resultDto.userId } })

    if (!user) {
        throw new NotFoundException("user topilmadi")
    }

    const userEnrolled = await this.userRepository
        .createQueryBuilder("user")
        .innerJoin("user.enrolledCourses", "course")
        .where("course.id = :courseId", { courseId: assignment.lesson.modules.course.id })
        .andWhere("user.id = :userId", { userId: user.id })
        .getOne();

    if (!userEnrolled) {
        throw new BadRequestException("bu topshiriqni kursiga yozilmagansiz")
    }

    const currentResult = await this.resultsRepository.findOne({
        where: { assignment: { id: assignmentId }, user: { id: user.id } }
    });

    if (currentResult) {
        return { message: "bu topshiriq uchun javob yuborgansiz"}
    }

    const result = this.resultsRepository.create({ ...resultDto, assignment, user })
    await this.resultsRepository.save(result)

    return { message: "topshiriq uchun javob saqlandi"}
  }


  async getAssignments(moduleId: number): Promise<Assignment[]> {
    return this.assignmentsRepository.find({
      where: { lesson: { modules: { id: moduleId } } },
      relations: ["lesson"]
    })
  }

  async deleteAssignment(id: number): Promise<string> {
    const assignment = await this.assignmentsRepository.findOne({ where: { id } })

    if (!assignment) {
      throw new NotFoundException("bunday topshiriq topilmadi")
    }

    await this.assignmentsRepository.remove(assignment)

    return "topshiriq muvaffaqiyatli o'chirildi"
  }
}
