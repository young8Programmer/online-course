import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  lessonId: number

  @Column()
  title: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column()
  score: number
}
