import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Module } from '../../module/entities/module.entity';
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

  @ManyToOne(() => Module, (module) => module.assignments)
  module: Module;

  @OneToMany(() => Result, (result) => result.assignment)
  results: Result[];
}
