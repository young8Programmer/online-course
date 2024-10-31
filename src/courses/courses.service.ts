import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Course } from './entities/course.entity'
import { User } from '../auth/entities/user.entity'

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createCourse(createCourseDto): Promise<any> {
    const duplicateCourse = await this.coursesRepository.findOne({ where: { name: createCourseDto.name } })
    if (duplicateCourse) {
      throw new BadRequestException("bu nomdagi kurs mavjud")
    }
    const course = this.coursesRepository.create(createCourseDto)
    await this.coursesRepository.save(course)
    return { message: "kurs yaratildi", course }
  }

  async findAllCourses(filterDto): Promise<any> {
    const query = this.coursesRepository.createQueryBuilder("course")
        .leftJoinAndSelect("course.enrolledUsers", "user")
        .leftJoinAndSelect("course.modules", "module")

    const { category, search, id } = filterDto

    if (id) {
        const courseId = Number(id)
        if (isNaN(courseId)) {
            throw new BadRequestException("Noto'g'ri id formati")
        }
        query.andWhere("course.id = :id", { id: courseId })
    }

    if (category) {
        query.andWhere("course.category = :category", { category })
    }

    if (search) {
        query.andWhere("(course.name LIKE :search OR course.description LIKE :search)", { search: `%${search}%` })
    }

    const courses = await query.getMany()
    return courses.length > 0 ? courses : { message: "kurslar topilmadi" }
  }

  async findOneCourse(id: number): Promise<Course> {
    const course = await this.coursesRepository.findOne({
        where: { id },
        relations: ['enrolledUsers', 'modules']
    })
    if (!course) {
        throw new NotFoundException("kurs topilmadi")
    }
    return course
  }

  async enrollUser(courseId: number, userId: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['enrolledCourses'] })
    if (!user) {
        return { message: "Bunday foydalanuvchi topilmadi" }
    }

    const course = await this.findOneCourse(courseId)
    const enrolledCourses = user.enrolledCourses.map(enrolledCourse => enrolledCourse.id)
    
    if (enrolledCourses.includes(course.id)) {
        return { message: "Siz bu kursga yozilgansiz" }
    }

    user.enrolledCourses.push(course)
    await this.userRepository.save(user)

    return { message: "Siz kursga yozildingiz" }
  }

  async updateCourse(id: number, updateCourseDto): Promise<any> {
    const course = await this.coursesRepository.findOneBy({ id })
    if (!course) {
      throw new NotFoundException("kurs topilmadi")
    }
    Object.assign(course, updateCourseDto)
    await this.coursesRepository.save(course)

    return {
      message: "kurs yangilandi",
      course
    }
  }

  async removeCourse(id: number): Promise<any> {
    const course = await this.coursesRepository.findOneBy({ id })
    if (!course) {
      throw new NotFoundException("kurs topilmadi")
    }
    await this.coursesRepository.remove(course)
    return { message: "kurs o'chirildi" }
  }
}
