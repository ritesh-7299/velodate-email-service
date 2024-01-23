import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MailerService } from './mailer.service';

@Module({
  imports: [PrismaModule],
  controllers: [EmailController],
  providers: [EmailService, MailerService],
})
export class EmailModule {}
