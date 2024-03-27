import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
export class UpdateEmailBodyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'Email subject',
        example: 'Activate your email',
    })
    readonly subject: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Email body',
        example: 'Dear customer ...',
    })
    readonly body: string;
}
