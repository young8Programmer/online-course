import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Modules } from '../../module/entities/module.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ type: 'text', nullable: true })
  content: string

  @ManyToOne(() => Modules, (modules) => modules.lessons)
  modules: Modules

  @OneToMany(() => Assignment, (assignment) => assignment.lesson)
  assignments: Assignment[]
}
