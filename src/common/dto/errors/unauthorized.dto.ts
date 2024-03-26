import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedDto {
  @ApiProperty({
    type: String,
    description: 'Exception code',
    example: 'unauthorized',
  })
  readonly code: string;

  @ApiProperty({
    type: String,
    description: 'Exception message',
    example: 'User is not authorized',
  })
  readonly message: string;
}
