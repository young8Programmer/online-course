import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.results)
  user: User;

  @ManyToOne(() => Assignment, (assignment) => assignment.results)
  assignment: Assignment;

  @Column()
  score: number;

  @Column()
  passed: boolean;
}
