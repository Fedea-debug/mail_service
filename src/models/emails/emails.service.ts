import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/providers/database/postgres/postgres.service';
import { CreateEmailBodyDto } from './dto/body/email-create-body.dto';
import { UpdateEmailBodyDto } from './dto/body/email-update-body.dto';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Injectable()
export class EmailsService {
    constructor(
        private readonly postgresService: PostgresService,
        private notificationsGateway: NotificationsGateway
    ) { }

    async createEmail(emailDto: CreateEmailBodyDto, userId: number) {
        try {
            let query = `INSERT INTO ${process.env.POSTGRES_SCHEMA}.t_emails (
        user_id, receiver_email, subject, body)
        VALUES ($1, $2, $3, $4);
        `
            let values = [userId, emailDto.receiver_email, emailDto.subject, emailDto.body]
            await this.postgresService.executeQuery(query, values)
            this.notificationsGateway.server.emit('emailCreated', { message: 'A new email has been created.' });
            return {
                success: true
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getEmails(userId: number) {
        let query = `SELECT * FROM ${process.env.POSTGRES_SCHEMA}.t_emails
        WHERE user_id = $1
        AND deleted IS NULL
        `
        let values = [userId]
        const emails = await this.postgresService.executeQuery(query, values)
        console.log(emails);

        return emails.rows.map(email => {
            return {
                receiver_email: email.receiver_email,
                subject: email.subject,
                body: email.body || ''
            }
        })
    }

    async updateEmail(emailId: number, emailUpdateBody: UpdateEmailBodyDto) {
        let query = `UPDATE ${process.env.POSTGRES_SCHEMA}.t_emails
        SET subject = $1, body = $2
        WHERE id = $3;
        `
        let values = [emailUpdateBody.subject, emailUpdateBody.body, emailId]
        await this.postgresService.executeQuery(query, values)
        return {
            success: true
        }
    }

    async deleteEmail(emailId: number) {
        let query = `UPDATE ${process.env.POSTGRES_SCHEMA}.t_emails
        SET deleted = NOW()
        WHERE id = $1;
        `
        let values = [emailId]

        await this.postgresService.executeQuery(query, values)
        return {
            success: true
        }
    }

}
