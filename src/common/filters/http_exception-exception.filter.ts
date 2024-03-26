import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpException,
  ForbiddenException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception['response'];
    const messages = exceptionResponse?.message;
    const message =
      status == 400 ? 'Incorrect form, check again' : exception.message;
    const code =
      status == 400
        ? (exceptionResponse?.error ?? exceptionResponse?.code)
          .toLowerCase()
          .replace(' ', '_')
        : exceptionResponse?.code
          ? exceptionResponse.code
          : HttpStatus.valueOf()[status].toLocaleLowerCase(); // get exception name by code
    const result = {
      message: message,
      code: code,
      errors: exceptionResponse?.errors,
    };

    if (Array.isArray(messages) && messages.length) {
      result.errors = new Array();
      messages.map((msg) => {
        if (msg)
          result.errors.push({
            code: (exceptionResponse?.error).toLowerCase().replace(' ', '_'),
            message: msg,
            field: msg.split(' ')[0].toLocaleLowerCase(),
          });
      });
    }
    response.status(status).json(result);
  }
}
