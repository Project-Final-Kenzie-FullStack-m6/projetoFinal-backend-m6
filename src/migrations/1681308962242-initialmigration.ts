import { MigrationInterface, QueryRunner } from "typeorm";

export class initialmigration1681308962242 implements MigrationInterface {
    name = 'initialmigration1681308962242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adversiments" ADD "description" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "complement" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(64) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "complement" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adversiments" DROP COLUMN "description"`);
    }

}
