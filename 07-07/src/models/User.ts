import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;
  @Column({ type: "varchar", nullable: false, length: 100 })
  name: string;
  @Column({ type: "varchar", nullable: false, unique: true, length: 150 })
  email: string;
  @Column({ type: "varchar", select: false, nullable: false, length: 255 })
  password: string;
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[]
}