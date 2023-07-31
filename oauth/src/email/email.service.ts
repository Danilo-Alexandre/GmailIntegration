import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class EmailService {
  private createEmail(to: string, from: string, subject: string, message: string) {
    const emailLines = [
      `To: ${to}`,
      `From: ${from}`,
      `Subject: ${subject}`,
      '',
      message,
    ];
    const email = emailLines.join('\n').trim();

    const base64EncodedEmail = Buffer.from(email).toString('base64url');
    return base64EncodedEmail;
  }

  async sendEmail(to: string, subject: string, message: string, accessToken: string) {
    const oAuth2Client = new OAuth2Client();
    oAuth2Client.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const raw = this.createEmail(to, 'me', subject, message);
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: raw,
      },
    });
  }
}
