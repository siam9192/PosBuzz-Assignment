import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from 'generated/prisma/client';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';

    // NestJS Http Exceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      message =
        typeof res === 'string'
          ? res
          : ((res as any).message ?? 'Error occurred');
    }

    // Prisma Errors
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;

      if (exception.code === 'P2002') {
        message = 'Duplicate field value';
      } else {
        message = exception.message;
      }
    }

    //  Validation Errors (class-validator)
    else if (Array.isArray((exception as any)?.message)) {
      status = HttpStatus.BAD_REQUEST;
      message = (exception as any).message;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
