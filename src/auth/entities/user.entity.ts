import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm'
import { Course } from '../../courses/entities/course.entity'
import { Result } from '../../results/entities/result.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ default: "student" })
  role: string

  @ManyToMany(() => Course, (course) => course.enrolledUsers, {cascade: true})
  @JoinTable()
  enrolledCourses: Course[]

  @OneToMany(() => Result, (result) => result.user, {onDelete: "CASCADE"})
  results: Result[]
}
