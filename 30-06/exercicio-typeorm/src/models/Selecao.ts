import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Jogador } from "./Jogador";

@Entity("selecoes")
export class Selecao {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", nullable: false, unique: true })
  pais: string;
  @Column({ type: "varchar", nullable: false, unique: true })
  nome: string;
  @Column({ type: "varchar", unique: true, nullable: false })
  tecnico: string;
  @Column({ type: "int", unique: true, nullable: false })
  rankingFifa: number;
  @Column({ type: "year", nullable: false })
  anoFundacao: number;
  @OneToMany(() => Jogador, (jogador) => jogador.selecao)
  jogadores: Jogador[];
}