import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUsuarioIdDeProduto1698167053184 implements MigrationInterface {
    name = 'RemoveUsuarioIdDeProduto1698167053184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "usuarioId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ADD "usuarioId" character varying(100) NOT NULL`);
    }

}
