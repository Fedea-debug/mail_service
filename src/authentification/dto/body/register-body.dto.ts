import { IsNotEmpty, IsString } from 'class-validator';
import { LoginBodyDto } from './login-body.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsPasswordValid } from 'src/common/decorators/valid-password.decorator';

export class RegisterBodyDto extends LoginBodyDto {
  @IsString()
  @IsNotEmpty()
  @IsPasswordValid({
    message:
      'Password does not meet complexity requirements or is equal to the email.',
  })
  @ApiProperty({
    type: String,
    description: 'User pasword',
    example: 'admin',
  })
  readonly password: string;
}
