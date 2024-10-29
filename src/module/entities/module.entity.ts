import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Course, (course) => course.modules)
  course: Course;

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons: Lesson[];

  @OneToMany(() => Assignment, (assignment) => assignment.module)
  assignments: Assignment[];
}
