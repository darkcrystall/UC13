import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Selecao } from "./Selecao";

@Entity("jogadores")
export class Jogador {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "varchar", length: 200, unique: true, nullable: false })
    nome: string;
    @Column({ type: "int", nullable: false })
    numeroCamisa: number;
    @Column({ type: "enum", nullable: false })
    posicao: string;
    @Column({ type:"int", nullable: false })
    idade: number;
    @Column({ type: "decimal", nullable: false })
    altura: number;
    @Column({ type: "decimal", nullable: false })
    peso: number;
    @OneToOne(() => Selecao, (pais) => pais.jogadores)
    pais: string;
}