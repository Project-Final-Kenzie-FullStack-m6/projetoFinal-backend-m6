import { MigrationInterface, QueryRunner } from "typeorm";

export class newTypecpf1681997245574 implements MigrationInterface {
    name = 'newTypecpf1681997245574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cpf" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cpf" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" integer NOT NULL`);
    }

}
