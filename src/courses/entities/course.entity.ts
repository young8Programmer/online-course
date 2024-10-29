import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Module } from '../../module/entities/module.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  teacher: string;

  @Column()
  category: string;

  @Column()
  level: string;

  @Column("simple-array", { default: "" })
  enrolledUsers: number[];

  @OneToMany(() => Module, (module) => module.course)
  modules: Module[]
}
