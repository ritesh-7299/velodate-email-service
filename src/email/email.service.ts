import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SendEmailDto } from './dto/send-email.dto';
import { MailerService } from './mailer.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  async sendEmail(sendEmailDto: SendEmailDto) {
    try {
      if (sendEmailDto.target_to == 'new_users') {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const newUsersResult = await this.prisma.users.findMany({
          where: {
            email: {
              not: null,
            },
            createdate: {
              gte: lastMonth,
            },
          },
          select: {
            email: true,
          },
        });

        if (newUsersResult.length) {
          this.mailerService.sendMail(
            newUsersResult,
            sendEmailDto.title,
            sendEmailDto.message,
          );
        }
      } else {
        const allUsersResult = await this.prisma.users.findMany({
          where: {
            email: {
              not: null,
            },
          },
          select: {
            email: true,
          },
        });

        if (allUsersResult.length) {
          this.mailerService.sendMail(
            allUsersResult,
            sendEmailDto.title,
            sendEmailDto.message,
          );
        }
      }
      sendEmailDto['date'] = new Date();
      await this.prisma.emails.create({ data: sendEmailDto });
      return { success: true, message: 'email sent successfully' };
    } catch (error) {
      return { success: false, message: 'Something went wrong' };
    }
  }
}
