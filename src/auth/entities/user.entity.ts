import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, UpdateQuery } from 'mongoose';
import { genderEnum } from 'src/enums/gender.enum';
import { registerTypeEnum } from 'src/enums/register-type.enum';
import { rolesEnum } from 'src/enums/roles.enum';

@Schema()
export class User extends Document {
  @ApiProperty()
  @Prop({
    required: true,
  })
  firstName: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  lastName: string;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop({
    default: true,
  })
  isActive: boolean;

  @ApiProperty()
  @Prop({
    default: false,
  })
  blocked: boolean;

  @ApiProperty()
  @Prop({
    required: true,
    default: registerTypeEnum.email,
    enum: registerTypeEnum,
  })
  registerType: string;

  @ApiProperty()
  @Prop({
    required: true,
    default: rolesEnum.user,
    enum: rolesEnum,
  })
  role: string;

  @ApiProperty()
  @Prop({
    default: genderEnum.male,
    enum: genderEnum,
  })
  gender: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop({
    default: new Date(),
  })
  createAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  this.email = this.email.toLowerCase().trim();

  next();
});

UserSchema.pre('findOneAndUpdate', function (this: UpdateQuery<User>, next) {
  const update = this.getUpdate();

  if (update && update.email) {
    update.email = update.email.toLowerCase().trim();
  }

  next();
});
