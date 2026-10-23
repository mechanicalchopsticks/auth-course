import { Controller, Post, UseGuards, Request, Get} from '@nestjs/common';
import { AuthenticatedGuard } from './guards/authenticated.guard.js';
import { LocalAuthGuard } from './guards/local-auth.guards.js';

@Controller('auth')
export class AuthController {

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    const { password, ...user } = req.user;
    return user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  async check(@Request() req: any) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('session')
  getSession(@Request() req: any) {
    console.log('Session:', req.session);
    console.log('User:', req.user);
    return {
      isAuthenticated: req.isAuthenticated(),
      session: req.session,
      user: req.user,
    };
  }

  @Post('logout')
  logout(@Request() req: any) {
    req.session.destroy((err: any) => {
      if (err) {
        console.log('Error destroying session:', err);
      }
    });

    req.logout(() => {});

    return { message: 'The user has been successfully logged out.' };
  }
}