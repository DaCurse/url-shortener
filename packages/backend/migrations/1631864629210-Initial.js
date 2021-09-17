const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class Initial1631864629210 {
  name = 'Initial1631864629210';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "links" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar NOT NULL, "code" varchar(32) NOT NULL, "visit_count" integer NOT NULL DEFAULT (0), CONSTRAINT "UQ_52a3fa2a2c27a987ed58fd2ea42" UNIQUE ("code"))`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "links"`);
  }
};
