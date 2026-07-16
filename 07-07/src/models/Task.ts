import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Status } from "../enum/Status";
import { Priority } from "../enum/Priority";
@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: number;
  @Column({ type: "varchar", default: "Sem título", length: 100 })
  title: string;
  @Column({ type: "varchar", nullable: false, length: 255 })
  description: string;
  @Column({ type: "enum", enum: Status, default: Status.PENDENT })
  status: Status;
  @Column({ type: "enum", enum: Priority, default: Priority.LOW })
  priority: Priority;
  @Column({ type: "timestamp", update: false })
  createdAt: Date;
  @Column({ type: "timestamp", update: true })
  updatedAt: Date;
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}