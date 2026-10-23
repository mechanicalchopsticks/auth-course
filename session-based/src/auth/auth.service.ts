import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    // the undefined check is to make TypeScript happy
    if (!user) return null;

    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) return null;

    const { password: pass, ...result } = user;

    return result;
  }
}