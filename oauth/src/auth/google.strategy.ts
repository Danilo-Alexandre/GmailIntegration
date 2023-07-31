import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID, // obtained from Google Cloud Console
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // obtained from Google Cloud Console
      callbackURL: 'http://localhost:4110/auth/google/redirect', // same as set in Google Cloud Console
      scope: ['email', 'profile', 'https://www.googleapis.com/auth/gmail.send'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    const { name, emails } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
    }
    done(null, user);
  }
}
