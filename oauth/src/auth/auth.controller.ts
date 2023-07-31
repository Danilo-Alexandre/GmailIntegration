import { Controller, Get, UseGuards, Request, Response, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleLoginRedirect(@Req() req: ExpressRequest, @Res() res: ExpressResponse) {
    // handles the Google OAuth2 callback
    const user = req.user as any;
    // here you can create the user if it doesn't exist in your database and start a session
    // For now, just send the user information as a response
    console.log(user)
    res.redirect('http://localhost:3000/home/settings/integration')
  }
}
