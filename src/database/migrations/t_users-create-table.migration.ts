import { MigrationInterface, QueryRunner } from 'typeorm';
require('dotenv').config();

export class UsersCreateTableMigration1727442000000
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE ${process.env.POSTGRES_SCHEMA}.t_users
            (
                id serial NOT NULL,
                email character varying(70) NOT NULL,
                password character varying(100) NOT NULL,
                activation_code character varying(100) DEFAULT null,
                activation_code_expiry timestamptz  DEFAULT null,
                activated timestamptz  DEFAULT null,
                created timestamptz  NOT NULL DEFAULT NOW(), -- Set default value at the database level
                deleted timestamptz  DEFAULT null,
                PRIMARY KEY (id),
                CONSTRAINT email_deleted
                      UNIQUE NULLS NOT DISTINCT (email, deleted)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE IF EXISTS ${process.env.POSTGRES_SCHEMA}.t_users;`,
        );
    }
}
