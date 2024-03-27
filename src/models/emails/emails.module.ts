import { Module } from '@nestjs/common';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Module({
  controllers: [EmailsController],
  providers: [EmailsService, NotificationsGateway]
})
export class EmailsModule {}
