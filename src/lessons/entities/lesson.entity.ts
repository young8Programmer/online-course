import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Modules } from '../../module/entities/module.entity'

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  courseId: number

  @Column()
  title: string

  @Column({ type: 'text', nullable: true })
  content: string

  @ManyToMany(() => Modules, (modules) => modules.lessons)
  modules: Modules[]
}
