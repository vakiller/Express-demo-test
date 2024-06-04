const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class RemoveUniqueItemName1717469715238 {
    name = 'RemoveUniqueItemName1717469715238'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "UQ_c6ae12601fed4e2ee5019544ddf"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "UQ_c6ae12601fed4e2ee5019544ddf" UNIQUE ("name")`);
    }

}