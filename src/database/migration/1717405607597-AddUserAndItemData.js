const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddUserAndItemData1717405607597 {
    name = 'AddUserAndItemData1717405607597'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "damage" integer NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "userId" integer, CONSTRAINT "UQ_c6ae12601fed4e2ee5019544ddf" UNIQUE ("name"), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
