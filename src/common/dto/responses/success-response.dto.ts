import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiProperty({
    type: Boolean,
    description: 'Success operation status',
    example: true,
  })
  readonly success: boolean;
}
