import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  assignmentId: number

  @Column()
  score: number
}
