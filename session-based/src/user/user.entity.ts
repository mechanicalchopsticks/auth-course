import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column({ type: 'varchar', length: 255, select: true, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 500, select: false })
  password!: string;

  @Column({ type: 'varchar', length: 10})
  role!: string;
}