import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenResponseDto {
  @ApiProperty({
    type: String,
    description: 'Access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJ0eXBlIjoiMDcwNzFjYmM4NTMyNzZmMCIsImlhdCI6MTcwODk0NTc3MiwiZXhwIjoxNzA4OTQ5MzcyfQ.fIZULxmk6zXXbxrVvr4NiDy-U7E7V-qJL65qvL_IO_g',
  })
  readonly access_token: string;

  @ApiProperty({
    type: Number,
    description: 'Access token time to live',
    example: 3600,
  })
  readonly ttl: number;
}
