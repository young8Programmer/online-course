import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Result } from '../../results/entities/result.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: "student" })
  role: string;

  @OneToMany(() => Result, (result) => result.user)
  results: Result[];
}
