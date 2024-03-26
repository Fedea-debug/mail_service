import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenDto {
  @ApiProperty({
    type: String,
    description: 'Exception message',
    example: 'Too many atempts',
  })
  readonly message: string;

  @ApiProperty({
    type: String,
    description: 'Exception code',
    example: 'forbidden_error',
  })
  readonly code: string;
}
