import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class IdParamDto {
    @IsNumber()
    @ApiProperty({
        type: Number,
        description: 'Email id',
        example: 12,
        required: true,
    })
    readonly id: number;
}
