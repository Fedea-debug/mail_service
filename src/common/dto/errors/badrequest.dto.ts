import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDto {
  @ApiProperty({
    type: String,
    description: 'Exception message',
    example: 'All fields are required',
  })
  readonly message: string;

  @ApiProperty({
    type: String,
    description: 'Exception code',
    example: 'bad_request',
  })
  readonly code: string;

  @ApiProperty({
    type: Array,
    description: 'Errors Array',
    example: [
      {
        field: 'first_name',
        code: 'required',
        message: 'First name is required',
      },
    ],
  })
  readonly errors: Array<any>;
}
