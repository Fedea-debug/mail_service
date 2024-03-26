import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './providers/database/postgres/postgres.module';
import { AuthModule } from './authentification/auth.module';
import { EmailsModule } from './models/emails/emails.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    PostgresModule,
    AuthModule,
    EmailsModule
  ],
  controllers: [AppController],
})
export class AppModule {}
