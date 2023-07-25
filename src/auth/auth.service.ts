import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class AuthService {
  createUser(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  login(loginUserDto: LoginUserDto) {
    return loginUserDto;
  }
}
