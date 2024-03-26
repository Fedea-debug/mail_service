import { MigrationInterface, QueryRunner } from 'typeorm';
require('dotenv').config();

export class CreateTServicesTableMigration1727449200000
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE ${process.env.POSTGRES_SCHEMA}.t_emails
            (
                id serial NOT NULL,
                user_id integer NOT NULL,
                receiver_email character varying(150) NOT NULL,
                subject character varying(255) NOT NULL,
                body text DEFAULT null,
                created timestamptz  NOT NULL DEFAULT NOW(),
                deleted timestamptz  DEFAULT null,
                PRIMARY KEY (id),
                CONSTRAINT fk_user_id FOREIGN KEY (user_id)
                    REFERENCES ${process.env.POSTGRES_SCHEMA}.t_users (id) MATCH SIMPLE
                    ON UPDATE RESTRICT ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE IF EXISTS ${process.env.POSTGRES_SCHEMA}.t_emails;`,
        );
    }
}
