import { Catch, ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { isNumber } from 'class-validator';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  private logger = new Logger('RpcCustomExceptionFilter')
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse()

    const rpcError = exception.getError();

    this.logger.log(rpcError)

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError &&
      isNumber(rpcError.status)
    ) {
      const status = isNaN(+rpcError.status!) ? 400 : rpcError.status
      return response.status(rpcError.status).json(rpcError)
    }


    response.status(400).json({
      status: 400,
      message: rpcError
    })
    
  }
}