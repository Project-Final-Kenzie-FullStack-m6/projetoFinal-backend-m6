import {
    Entity, Column,
    PrimaryGeneratedColumn,CreateDateColumn,
    UpdateDateColumn,OneToMany, ManyToOne
} from "typeorm";

import { Comment } from "./comments.entity";
import { User } from "./user.entity";
import { Image } from "./image.entity";


@Entity("adversiments")
export class Adversiment{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 50, nullable: false})
    brand: string;

    @Column({length: 50, nullable: false})
    model: string;

    @Column({nullable: false})
    age: number;

    @Column({length: 10, nullable: false})
    fuelType: string;

    @Column({nullable: false})
    mileAge: number;

    @Column({nullable: false})
    price: number;

    @Column({length: 20, nullable: false})
    color: string;

    @Column({ length: 255, nullable: false })
    description: string;
    
    @Column({nullable: false})
    fipe: number;

    @Column({ default: true})
    isActive: boolean;

    @CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

    @ManyToOne(() => User, user => user.adversiments)
    user: User;

    @OneToMany(() => Comment, comments => comments.adversiment)
    comments: Comment[];

    @OneToMany(() => Image, images => images.adversiments)
    images: Image[];

};