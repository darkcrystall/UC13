import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", default: "Sem título", length: 100 })
  title: string;
  @Column({ type: "varchar", nullable: false, length: 255 })
  description: string;
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}