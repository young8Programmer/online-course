import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Result } from '../../results/entities/result.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column()
  score: number

  @ManyToOne(() => Lesson, (lesson) => lesson.assignments, {onDelete: "CASCADE"})
  lesson: Lesson

  @OneToMany(() => Result, (result) => result.assignment, {onDelete: "CASCADE"})
  results: Result[]
}
