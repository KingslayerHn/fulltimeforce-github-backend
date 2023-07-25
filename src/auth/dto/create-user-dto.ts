import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number and at least a special character',
  })
  password: string;
}
