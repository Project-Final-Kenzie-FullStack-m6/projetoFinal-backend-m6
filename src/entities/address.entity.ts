import {
    Entity, Column,
    PrimaryGeneratedColumn,CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("addresses")
export class Address{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false, precision: 8})
    cep: number;

    @Column({length: 2, nullable: false})
    state: string;

    @Column({length: 30, nullable: false})
    city: string;

    @Column({length: 50, nullable: false})
    district: string;

    @Column({length: 80, nullable: false})
    street: string;

    @Column({nullable: false})
    number: number;

    @Column({length: 50})
    complement: string;

    @CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}