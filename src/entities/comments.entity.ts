// import {
//     Entity, Column,
//     PrimaryGeneratedColumn,CreateDateColumn,
//     UpdateDateColumn, ManyToOne
// } from "typeorm";
// import { User } from "./user.entity";
// import { Adversiment } from "./adversiments.entity";

// @Entity("comments")
// export class Comment{
//     @PrimaryGeneratedColumn("uuid")
//     id: string;

//     @Column({length: 255, nullable: false})
//     content: string;

//     @CreateDateColumn()
// 	createdAt: Date;

// 	@UpdateDateColumn()
// 	updatedAt: Date;

//     @ManyToOne(() => User)
//     user: User;

//     // @ManyToOne(() => Adversiment, adversiment => adversiment.comments)
//     // adversiment: Adversiment;
// }