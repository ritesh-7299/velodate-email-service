import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @UseGuards(AuthGuard)
  @Post('sendEmail')
  sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.emailService.sendEmail(sendEmailDto);
  }
}
