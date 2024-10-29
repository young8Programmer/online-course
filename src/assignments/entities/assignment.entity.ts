import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Modules } from '../../module/entities/module.entity';
import { Result } from '../../results/entities/result.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  score: number;

  @OneToMany(() => Result, (result) => result.assignment)
  results: Result[];
}
