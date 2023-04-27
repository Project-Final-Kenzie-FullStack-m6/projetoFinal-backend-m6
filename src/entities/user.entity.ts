import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	BeforeUpdate,
	BeforeInsert,
	JoinColumn,
	OneToMany,
} from "typeorm";

import { getRounds, hashSync } from "bcryptjs";
import { Address } from "./address.entity";
import { Advertisement } from "./advertisements.entity";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ length: 50, nullable: false })
	name: string;

	@Column({ length: 50, nullable: false, unique: true })
	email: string;

	@Column({ length: 64, nullable: false })
	password: string;

  @Column({ nullable: false,type:"bigint" })
  phone: number;

	@Column({ nullable: false, type: "bigint" })
	cpf: number;

	@Column({ nullable: false })
	birthDate: Date;

	@Column({ length: 255, nullable: false })
	description: string;

	@Column({ nullable: false })
	isSeller: boolean;

	@Column({ nullable: false, default: true })
	isActive: boolean;

	@Column({ nullable: true, default: null })
	resetToken: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(() => Address)
	@JoinColumn()
	address: Address;

	@OneToMany(() => Advertisement, (advertisements) => advertisements.user)
	advertisements: Advertisement[];

	@BeforeUpdate()
	@BeforeInsert()
	hashPassword() {
		const isEncrypted = getRounds(this.password);
		if (!isEncrypted) {
			this.password = hashSync(this.password, 10);
		}
	}
}
