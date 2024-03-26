import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginBodyDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'User email',
    example: 'boseadeli6@gmail.com',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'User pasword',
    example: 'admin',
  })
  readonly password: string;
}
