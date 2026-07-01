import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Selecao } from "./Selecao";
import { Posicao } from "./Posicao";

@Entity("jogadores")
export class Jogador {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", length: 200, unique: true, nullable: false })
  nome: string;
  @Column({ type: "int", nullable: false })
  numeroCamisa: number;
  @Column({ type: "enum", enum: Posicao, nullable: false })
  posicao: Posicao;
  @Column({ type: "int", nullable: false })
  idade: number;
  @Column({ type: "decimal", nullable: false })
  altura: number;
  @Column({ type: "decimal", nullable: false })
  peso: number;
  @Column({ type: "int", nullable: false, default: 0 })
  gols: number;
  @ManyToOne(() => Selecao, (selecao) => selecao.jogadores)
  selecao: Selecao;
}