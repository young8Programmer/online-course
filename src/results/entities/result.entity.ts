import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number

  @Column("text")
  solution: string

  @Column({default: 100})
  score: number

  @ManyToOne(() => User, (user) => user.results, {onDelete: "CASCADE"})
  user: User

  @ManyToOne(() => Assignment, (assignment) => assignment.results, {onDelete: "CASCADE"})
  assignment: Assignment
}
