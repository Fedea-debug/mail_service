import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import postgresConfiguration from './configuration';
import { PostgresConfigService } from './config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [postgresConfiguration],
    }),
  ],
  providers: [PostgresConfigService],
  exports: [PostgresConfigService], // Make sure to export the service
})
export class PostgresConfigModule {}
