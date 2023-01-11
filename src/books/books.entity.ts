import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

// 모델
@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  name: string

  @Column()
  genre: string
}
