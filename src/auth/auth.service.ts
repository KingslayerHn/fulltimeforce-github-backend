import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      let user = await this.userModel.findOne({
        email: createUserDto.email,
      });

      if (user) throw new BadRequestException('The email already exist');

      user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      return {
        user,
        token: this.getJwToken({
          id: user.id,
        }),
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('The email already exist ');
      }

      throw new InternalServerErrorException();
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });

    if (!user) throw new UnauthorizedException('credential are not valid');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('credential are not valid');

    return {
      user,
      token: this.getJwToken({
        id: user.id,
      }),
    };
  }

  private getJwToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
