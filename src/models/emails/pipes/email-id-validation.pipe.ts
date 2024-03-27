import {
    ArgumentMetadata,
    Injectable,
    NotFoundException,
    PipeTransform,
} from '@nestjs/common';
import { PostgresService } from 'src/providers/database/postgres/postgres.service';

@Injectable()
export class EmailIdValidationPipe implements PipeTransform {
    constructor(
        private postgresService: PostgresService
    ) { }

    async transform(req: any, metadata: ArgumentMetadata) {
        let emailId = req.params.id;
        if (emailId !== undefined) {
            let query = `SELECT * FROM ${process.env.POSTGRES_SCHEMA}.t_emails WHERE id = $1 AND user_id = $2 AND deleted IS NULL LIMIT 1`
            let values = [emailId, req.user.userId]

            const email = await this.postgresService.executeQuery(query, values)
            if (email.rows[0] == null) {
                throw new NotFoundException('Email is not found');
            }
        }
        return req;
    }
}
