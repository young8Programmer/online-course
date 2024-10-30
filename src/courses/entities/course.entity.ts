import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm'
import { User } from '../../auth/entities/user.entity'
import { Modules } from '../../module/entities/module.entity'

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  price: number

  @Column()
  teacher: string

  @Column()
  category: string

  @Column()
  level: string

  @ManyToMany(() => User, (user) => user.enrolledCourses)
  enrolledUsers: User[]

  @OneToMany(() => Modules, (module) => module.course)
  modules: Modules[]
}
