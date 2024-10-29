import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity()
export class Modules {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons: Lesson[];
}
