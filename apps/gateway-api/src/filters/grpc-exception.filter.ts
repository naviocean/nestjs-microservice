import { status } from '@grpc/grpc-js';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

export class RpcException extends Error {
  code: number;
  details: any;
}

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
  static GrpcStatusCode: Record<number, number> = {
    // standard gRPC error mapping
    // https://cloud.google.com/apis/design/errors#handling_errors
    [status.INVALID_ARGUMENT]: HttpStatus.BAD_REQUEST,
    [status.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED,
    [status.ABORTED]: HttpStatus.PAYMENT_REQUIRED,
    [status.PERMISSION_DENIED]: HttpStatus.FORBIDDEN,
    [status.NOT_FOUND]: HttpStatus.NOT_FOUND,
    [status.CANCELLED]: HttpStatus.METHOD_NOT_ALLOWED,
    [status.ALREADY_EXISTS]: HttpStatus.CONFLICT,
    [status.DATA_LOSS]: HttpStatus.GONE,
    [status.FAILED_PRECONDITION]: HttpStatus.PRECONDITION_FAILED,
    [status.RESOURCE_EXHAUSTED]: HttpStatus.TOO_MANY_REQUESTS,
    [status.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR,
    [status.UNIMPLEMENTED]: HttpStatus.NOT_IMPLEMENTED,
    [status.UNKNOWN]: HttpStatus.BAD_GATEWAY,
    [status.UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,
    [status.DEADLINE_EXCEEDED]: HttpStatus.GATEWAY_TIMEOUT,

    // additional built-in http exceptions
    // https://docs.nestjs.com/exception-filters#built-in-http-exceptions
    // 499: status.CANCELLED,
    // [HttpStatus.HTTP_VERSION_NOT_SUPPORTED]: status.UNAVAILABLE,
    [status.OUT_OF_RANGE]: HttpStatus.PAYLOAD_TOO_LARGE,
    // [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: status.CANCELLED,
    // [HttpStatus.UNPROCESSABLE_ENTITY]: status.CANCELLED,
    // [HttpStatus.I_AM_A_TEAPOT]: status.UNKNOWN,
  };

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .json(exception.getResponse());
    }
    const status =
      GrpcExceptionFilter.GrpcStatusCode[(exception as RpcException).code] ||
      HttpStatus.INTERNAL_SERVER_ERROR;
    const message = (exception as RpcException).details || exception.message;
    return response.status(status).json({ message, statusCode: status });
  }
}
