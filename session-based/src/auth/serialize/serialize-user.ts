import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../../user/user.service.js';

@Injectable()
export class SerializeUser extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: any, done: (err: any, id?: string) => void): void {
    done(null, user.id);
  }

  async deserializeUser(payload: any, done: (err: any, user?: any) => void) {
    try {
      const user = await this.userService.findById(payload);
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
}
