import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiSecurity, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentification/guards/jwt-auth.guard';
import { BadRequestDto } from 'src/common/dto/errors/badrequest.dto';
import { ForbiddenDto } from 'src/common/dto/errors/forbidden.dto';
import { UnauthorizedDto } from 'src/common/dto/errors/unauthorized.dto';
import { HttpExceptionFilter } from 'src/common/filters/http_exception-exception.filter';
import { EmailsService } from './emails.service';
import { SuccessResponseDto } from 'src/common/dto/responses/success-response.dto';
import { CreateEmailBodyDto } from './dto/body/email-create-body.dto';
import { IdParamDto } from './dto/params/email-id-param.dto';
import { UpdateEmailBodyDto } from './dto/body/email-update-body.dto';
import { ReqDec } from 'src/common/decorators/req.decorator';
import { EmailIdValidationPipe } from './pipes/email-id-validation.pipe';
import { SanitizePipe } from 'src/common/pipes/sanitize.pipe';

@Controller('public')
export class EmailsController {
    constructor(
        private emailsService: EmailsService
    ) { }

    @ApiOperation({ summary: 'Create an email' })
    @ApiCreatedResponse({ type: SuccessResponseDto })
    @ApiBadRequestResponse({ type: BadRequestDto })
    @ApiUnauthorizedResponse({ type: UnauthorizedDto })
    @ApiForbiddenResponse({ type: ForbiddenDto })
    @ApiSecurity('JWT-Auth')
    @UseGuards(JwtAuthGuard)
    @UseFilters(HttpExceptionFilter)
    @UsePipes(new SanitizePipe())
    @Post('email')
    async createEmail(@Body() emailBodyDto: CreateEmailBodyDto, @Req() req) {
        return await this.emailsService.createEmail(emailBodyDto, req.user.userId)
    }

    @ApiOperation({ summary: 'Get emails' })
    @ApiOkResponse({ type: CreateEmailBodyDto, isArray: true })
    @ApiBadRequestResponse({ type: BadRequestDto })
    @ApiUnauthorizedResponse({ type: UnauthorizedDto })
    @ApiForbiddenResponse({ type: ForbiddenDto })
    @ApiSecurity('JWT-Auth')
    @UseGuards(JwtAuthGuard)
    @UseFilters(HttpExceptionFilter)
    @Get('emails')
    async getEmails(@Req() req) {
        return await this.emailsService.getEmails(req.user.userId)
    }

    @ApiOperation({ summary: 'Update an email' })
    @ApiCreatedResponse({ type: SuccessResponseDto })
    @ApiBadRequestResponse({ type: BadRequestDto })
    @ApiUnauthorizedResponse({ type: UnauthorizedDto })
    @ApiForbiddenResponse({ type: ForbiddenDto })
    @ApiSecurity('JWT-Auth')
    @UseGuards(JwtAuthGuard)
    @UseFilters(HttpExceptionFilter)
    @UsePipes(new SanitizePipe())
    @Put('email/:id')
    async updateEmail(
        @ReqDec(EmailIdValidationPipe) request,
        @Param() id: IdParamDto,
        @Body() emailBodyDto: UpdateEmailBodyDto
    ) {
        return await this.emailsService.updateEmail(id.id, emailBodyDto)
    }

    @ApiOperation({ summary: 'Delete an email' })
    @ApiCreatedResponse({ type: SuccessResponseDto })
    @ApiBadRequestResponse({ type: BadRequestDto })
    @ApiUnauthorizedResponse({ type: UnauthorizedDto })
    @ApiForbiddenResponse({ type: ForbiddenDto })
    @ApiSecurity('JWT-Auth')
    @UseGuards(JwtAuthGuard)
    @UseFilters(HttpExceptionFilter)
    @UsePipes(new SanitizePipe())
    @Delete('email/:id')
    async deleteEmail(
        @ReqDec(EmailIdValidationPipe) request,
        @Param() id: IdParamDto,
    ) {
        return await this.emailsService.deleteEmail(id.id)
    }
}
