import { Global, Module } from '@nestjs/common';
import { PostgresConfigModule } from '../../../config/database/postgres/config.module';
import { PostgresService } from './postgres.service';

@Global()
@Module({
  imports: [PostgresConfigModule],
  providers: [PostgresService],
  exports: [PostgresService],
})
export class PostgresModule { }