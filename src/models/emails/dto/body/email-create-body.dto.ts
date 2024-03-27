import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
export class CreateEmailBodyDto {
    @IsEmail()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Receiver email',
        example: 'example@gmail.com',
    })
    readonly receiver_email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'Email subject',
        example: 'Activate your email',
    })
    readonly subject: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Email body',
        example: 'Dear customer ...',
    })
    readonly body: string;
}
