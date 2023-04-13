import {
    Entity, Column,
    PrimaryGeneratedColumn,CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";
import { Adversiment } from "./adversiments.entity";

@Entity("images")
export class Image{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 255, nullable: false})
    imageUrl: string;

    @CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

    @ManyToOne(() => Adversiment, adversiment => adversiment.images)
    adversiment: Adversiment;
}