import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';
import { PostgresConfigService } from '../../../config/database/postgres/config.service';

@Injectable()
export class PostgresService implements OnModuleInit, OnModuleDestroy {
    private pool: Pool;

    constructor(private readonly configService: PostgresConfigService) { }

    async onModuleInit() {
        this.pool = new Pool({
            host: this.configService.host,
            port: this.configService.port,
            user: this.configService.username,
            password: this.configService.password,
            database: this.configService.database,
        });
    }

    async onModuleDestroy() {
        await this.pool.end();
    }

    async executeQuery(query: string, params: any[] = []) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(query, params);
            return result;
        } finally {
            client.release();
        }
    }
}
