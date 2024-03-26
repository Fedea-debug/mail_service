import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class ActivateUserBodyDto {
  // @Matches(/^[a-fA-F0-9]{40}$/, { message: 'code must be a valid SHA1 value' })
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Activation code',
    example: 'b03890edba67ac65177138d49dd8293ba71ad43d',
  })
  readonly code: string;
}
