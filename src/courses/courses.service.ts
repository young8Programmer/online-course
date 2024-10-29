import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async createCourse(createCourseDto): Promise<any> {
    const duplicateCourse = await this.coursesRepository.findOne({ where: { name: createCourseDto.name } });
    if (duplicateCourse) {
      throw new BadRequestException("Bu nomdagi kurs allaqachon mavjud");
    }
    const course = this.coursesRepository.create(createCourseDto);
    await this.coursesRepository.save(course);
    return { message: "Kurs muvaffaqiyatli yaratildi", course };
  }

  async findAllCourses(filterDto): Promise<any> {
    const query = this.coursesRepository.createQueryBuilder("course");
    const { category, search } = filterDto;

    if (category) {
      query.andWhere("course.category = :category", { category });
    }

    if (search) {
      query.andWhere("(course.name LIKE :search OR course.description LIKE :search)", { search: `%${search}%` });
    }

    const courses = await query.getMany();
    return courses.length > 0 ? courses : { message: "Kurslar topilmadi" };
  }

  async findOneCourse(id: number): Promise<Course> {
    const course = await this.coursesRepository.findOneBy({id});
    if (!course) {
      throw new NotFoundException("Kurs topilmadi");
    }
    return course
  }

  async enrollUser(courseId: number, userId: number): Promise<any> {
    const course: any = await this.findOneCourse(courseId);
    if (!course.enrolledUsers.includes(userId)) {
      course.enrolledUsers.push(userId);
      await this.coursesRepository.save(course);
      return { message: "Siz kursga muvaffaqiyatli yozildingiz" };
    }
    return { message: "Siz allaqachon bu kursga yozilgansiz" };
  }

  async updateCourse(id: number, updateCourseDto): Promise<any> {
    const course = await this.coursesRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException("Kurs topilmadi");
    }
    Object.assign(course, updateCourseDto);
    await this.coursesRepository.save(course);

    return {
      message: "Kurs muvaffaqiyatli yangilandi",
      course
    };
  }

  async removeCourse(id: number): Promise<any> {
    const course = await this.coursesRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException("Kurs topilmadi");
    }
    await this.coursesRepository.remove(course);
    return { message: "Kurs muvaffaqiyatli o'chirildi" };
  }
}
