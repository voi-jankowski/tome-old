import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1719903350975 implements MigrationInterface {
  name = "InitialSchema1719903350975";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "isDefault" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "projectId" integer, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "attributes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" "public"."attributes_type_enum" NOT NULL DEFAULT 'string', "isDefault" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, CONSTRAINT "PK_32216e2e61830211d3a5d7fa72c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "items" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "item_attributes" ("id" SERIAL NOT NULL, "stringValue" character varying, "numberValue" integer, "booleanValue" boolean, "dateValue" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "itemId" integer, "attributeId" integer, CONSTRAINT "PK_1f04d0cef03934743b1d54e4ae8" PRIMARY KEY ("id"))`
    );

    // Insert default categories
    await queryRunner.query(`
        INSERT INTO "categories" ("name", "isDefault", "created_at", "updated_at") VALUES
        ('Character', true, now(), now()),
        ('Place', true, now(), now()),
        ('Event', true, now(), now());
    `);

    // Insert default attributes for Character category
    await queryRunner.query(`
        WITH char_cat AS (
            SELECT id FROM categories WHERE name = 'Character' LIMIT 1
        )
        INSERT INTO "attributes" ("name", "type", "isDefault", "created_at", "updated_at", "categoryId") VALUES
        ('Name', 'string', true, now(), now(), (SELECT id FROM char_cat)),
        ('DOB', 'date', true, now(), now(), (SELECT id FROM char_cat)),
        ('Parents', 'string', true, now(), now(), (SELECT id FROM char_cat)),
        ('Description', 'text', true, now(), now(), (SELECT id FROM char_cat)),
        ('Home', 'string', true, now(), now(), (SELECT id FROM char_cat));
    `);

    // Insert default attributes for Place category
    await queryRunner.query(`
        WITH place_cat AS (
            SELECT id FROM categories WHERE name = 'Place' LIMIT 1
        )
        INSERT INTO "attributes" ("name", "type", "isDefault", "created_at", "updated_at", "categoryId") VALUES
        ('Location', 'string', true, now(), now(), (SELECT id FROM place_cat)),
        ('Description', 'text', true, now(), now(), (SELECT id FROM place_cat)),
        ('Characters Involved', 'string', true, now(), now(), (SELECT id FROM place_cat));
    `);

    // Insert default attributes for Event category
    await queryRunner.query(`
        WITH event_cat AS (
            SELECT id FROM categories WHERE name = 'Event' LIMIT 1
        )
        INSERT INTO "attributes" ("name", "type", "isDefault", "created_at", "updated_at", "categoryId") VALUES
        ('Location', 'string', true, now(), now(), (SELECT id FROM event_cat)),
        ('Time', 'datetime', true, now(), now(), (SELECT id FROM event_cat)),
        ('Description', 'text', true, now(), now(), (SELECT id FROM event_cat)),
        ('Characters Involved', 'string', true, now(), now(), (SELECT id FROM event_cat));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "attributes" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."attributes_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "attributes" ADD "type" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" DROP COLUMN "dateValue"`
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" DROP COLUMN "booleanValue"`
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" DROP COLUMN "numberValue"`
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" DROP COLUMN "stringValue"`
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" ADD "value" character varying NOT NULL`
    );
    await queryRunner.query(`DROP TABLE IF EXISTS item_attributes`);
    await queryRunner.query(`DROP TABLE IF EXISTS attributes`);
    await queryRunner.query(`DROP TABLE IF EXISTS categories`);
    await queryRunner.query(`DROP TABLE IF EXISTS items`);
    await queryRunner.query(`DROP TABLE IF EXISTS projects`);
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
  }
}
