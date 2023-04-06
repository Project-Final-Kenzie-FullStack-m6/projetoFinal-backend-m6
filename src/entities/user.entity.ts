import {
    Entity, Column,
    PrimaryGeneratedColumn,CreateDateColumn,
    UpdateDateColumn,OneToOne,BeforeUpdate,
    BeforeInsert, JoinColumn,OneToMany
} from "typeorm";

import { getRounds, hashSync } from "bcryptjs";
import { Address } from "./address.entity";
import { Comment } from "./comments.entity";
import { Adversiment } from "./adversiments.entity";


@Entity("users")
export class User{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 50, nullable: false})
    name: string;

    @Column({length: 50, nullable: false, unique: true})
    email: string;

    @Column({length: 32,nullable: false})
    password: string;

    @Column({nullable: false, precision:11})
    phone: number;

    @Column({nullable: false})
    birthDate: Date;

    @Column({length: 255, nullable: false})
    description: string;

    @Column({nullable: false, type: "boolean"})
    isSeller: boolean;
    
    @Column({nullable: false, type: "boolean", default: true})
    isActive: boolean;

    @CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;


    @OneToMany(() => Adversiment, adversiments => adversiments.user)
    adversiments: Adversiment[];

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword(){
        const isEncrypted = getRounds(this.password);
        if(!isEncrypted){
            this.password = hashSync(this.password, 10);
        };
    };
};