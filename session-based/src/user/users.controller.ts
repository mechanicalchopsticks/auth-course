import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import * as bcrypt from 'bcryptjs';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(body.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashPassword = await bcrypt.hash(body.password, 10);
    const newUser = await this.userService.create({
      ...body,
      password: hashPassword,
      role: body.role || 'user',
    });
    return {
      message: 'User created successfully',
      user: { id: newUser.id, email: newUser.email, role: newUser.role },
    }
  }
}