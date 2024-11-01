import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Modules {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ type: 'text', nullable: true })
  description: string

  @ManyToOne(() => Course, (course) => course.modules, {onDelete: "CASCADE"})
  course: Course

  @OneToMany(() => Lesson, (lesson) => lesson.modules, {onDelete: "CASCADE"})
  lessons: Lesson[]
}
