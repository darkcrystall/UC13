import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: number;
  @Column({ type: "varchar", default: "Sem título", length: 100 })
  title: string;
  @Column({ type: "varchar", nullable: false, length: 255 })
  description: string;
  @Column( { type: "boolean", default: false })
  status: boolean;
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}