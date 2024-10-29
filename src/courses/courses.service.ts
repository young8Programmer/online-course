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
      throw new BadRequestException("nu nomdagi kurs mavjud")
    }
    const course = this.coursesRepository.create(createCourseDto)
    await this.coursesRepository.save(course)
    return { message: "kurs yaratildi", course }
  }

  async findAllCourses(filterDto): Promise<any> {
    const query = this.coursesRepository.createQueryBuilder("course")
    const { category, search } = filterDto

    if (category) {
      query.andWhere("course.category = :category", { category })
    }

    if (search) {
      query.andWhere("(course.name LIkE :search OR course.description LIkE :search)", { search: `%${search}%` })
    }

    const courses = await query.getMany()
    return courses.length > 0 ? courses : { message: "kurslar topilmadi" }
  }

  async findOneCourse(id: number): Promise<Course> {
    const course = await this.coursesRepository.findOneBy({id})
    if (!course) {
      throw new NotFoundException("kurs topilmadi")
    }
    return course
  }

  async enrollUser(courseId: number, userId: any): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      return { message: "Bunday foydalanuvchi topilmadi" }
    }
  
    const course = await this.findOneCourse(courseId)
    userId = Number(userId)

    const enrolledUsers = course.enrolledUsers.map(user => Number(user))
  
    if (enrolledUsers.includes(userId)) {
      return { message: "Siz bu kursga yozilgansiz" }
    }
  
    if (!course.enrolledUsers) {
      course.enrolledUsers = []
    }

    course.enrolledUsers.push(userId.toString())
    await this.coursesRepository.save(course)
  
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
