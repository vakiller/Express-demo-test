const { MigrationInterface, QueryRunner } = require("typeorm");
const bcrypt = require('bcrypt');

module.exports = class AddAdminUser1717471667637 {

    async up(queryRunner) {
        const hashedPassword = await bcrypt.hash("admin", 10);
        await queryRunner.query(`INSERT INTO "public"."user" ("username", "password", "role") 
        VALUES ('admin', '${hashedPassword}', 'admin')`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM "public"."user" WHERE "username" = 'admin'`);
    }

}
