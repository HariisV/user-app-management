import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as ejs from 'ejs';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // Replace with your SMTP server
      port: process.env.MAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // Replace with your email
        pass: process.env.MAIL_PASSWORD, // Replace with your email password
      },
    });
  }

  async sendMail(to: string, text: string, fileName?: string, payload?: any) {
    // console.log(path.dirname(__dirname));
    // const templatePath = path.join(__dirname, '/mail/template', fileName);

    const templatePath = path.join(
      __dirname,
      '../../src/common/mail/template',
      fileName,
    );
    const mailOptions = {
      from: `"${process.env.MAIL_SENDER}" <${process.env.MAIL_USER}>`, // Sender address
      to, // List of receivers
      subject: text, // Subject line
      text, // Plain text body
      html: await ejs.renderFile(templatePath, payload),
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
