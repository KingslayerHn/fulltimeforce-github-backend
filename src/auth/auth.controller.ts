import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { GetUserFromRequest } from './decorators/get-user-from-request.decorator';
import { User } from './entities/user.entity';
import { Auth } from './decorators/auth.decorator';
import { rolesEnum } from 'src/enums/roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get()
  @Auth(rolesEnum.user)
  getUser(@GetUserFromRequest() userAuth: User) {
    return this.authService.getUserBytoken(userAuth);
  }
}
