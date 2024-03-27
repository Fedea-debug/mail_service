import {
    Body,
    Controller,
    Post,
    UseFilters,
    UsePipes,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AccessTokenResponseDto } from './dto/responses/access-token-response.dto';
import { SuccessResponseDto } from '../common/dto/responses/success-response.dto';
import { BadRequestDto } from 'src/common/dto/errors/badrequest.dto';
import { ForbiddenDto } from 'src/common/dto/errors/forbidden.dto';
import { LoginBodyDto } from './dto/body/login-body.dto';
import { RegisterBodyDto } from './dto/body/register-body.dto';
import { ActivateUserBodyDto } from './dto/body/activate-user-body.dto';
import { HttpExceptionFilter } from 'src/common/filters/http_exception-exception.filter';
import { SanitizePipe } from 'src/common/pipes/sanitize.pipe';

@ApiTags('/auth endpoint')
@Controller('public')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @ApiOperation({ summary: 'Login with email, password, and optional captcha' })
    @ApiCreatedResponse({ type: AccessTokenResponseDto })
    @ApiBadRequestResponse({ type: BadRequestDto })
    @ApiForbiddenResponse({ type: ForbiddenDto })
    @UseFilters(HttpExceptionFilter)
    @UsePipes(new SanitizePipe())
    @Post('auth/login')
    async login(@Body() loginDto: LoginBodyDto) {
        return await this.authService.login(loginDto);
    }


    @ApiOperation({ summary: 'Register a new user' })
    @ApiCreatedResponse({ type: SuccessResponseDto })
    @ApiBadRequestResponse({ type: BadRequestDto })
    @ApiForbiddenResponse({ type: ForbiddenDto })
    @UseFilters(HttpExceptionFilter)
    @UsePipes(new SanitizePipe())
    @Post('register')
    async register(@Body() registerDto: RegisterBodyDto) {
        return await this.authService.registerNewUser(registerDto);
    }

    @ApiOperation({ summary: 'Activate user email after registration' })
    @ApiCreatedResponse({ type: SuccessResponseDto })
    @ApiBadRequestResponse({ type: BadRequestDto })
    @ApiForbiddenResponse({ type: ForbiddenDto })
    @UseFilters(HttpExceptionFilter)
    @UsePipes(new SanitizePipe())
    @Post('activate-email')
    async activateEmail(@Body() activationDto: ActivateUserBodyDto) {
        return await this.authService.activateUser(activationDto.code);
    }
}
