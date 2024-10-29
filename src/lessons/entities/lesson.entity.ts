import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Module } from '../../module/entities/module.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  type: 'video' | 'text';

  @ManyToOne(() => Module, (module) => module.lessons)
  module: Module;
}
