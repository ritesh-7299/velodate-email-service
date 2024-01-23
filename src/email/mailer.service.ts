// mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    // Create a Nodemailer transporter
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.gmail_username, // Your Gmail email address
        pass: process.env.password, // Your Gmail password
      },
    });
  }

  async sendMail(
    recipients: any,
    subject: string,
    message: string,
  ): Promise<void> {
    // Loop through recipients and send emails
    for (const recipient of recipients) {
      try {
        // Send email
        await this.transporter.sendMail({
          from: 'theitgigs@gmail.com', // Your Gmail email address
          to: recipient.email,
          subject: subject,
          text: message,
        });

        console.log(`Email sent successfully to ${recipient.email}`);
      } catch (error) {
        console.error(
          `Error sending email to ${recipient.email}: ${error.message}`,
        );
      }
    }

    // Close the Nodemailer transporter
    this.transporter.close();
  }
}
