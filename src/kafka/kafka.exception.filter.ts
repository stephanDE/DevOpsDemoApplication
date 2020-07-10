import { RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { LoggingService } from '../logging/logging.service';
import { Observable, throwError } from 'rxjs';

export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  constructor(private logger: LoggingService) {}
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const value = host.switchToRpc().getData().value;

    const errors = exception.getError();

    if (errors instanceof Array) {
      let msg = '';

      for (const error of errors) {
        if (error.constraints) {
          msg += `Error on property ${error.property} with ${JSON.stringify(
            error.constraints,
          )} \n`;
        } else if (error.children) {
          msg += `Error on nested property ${error.property} with \n`;

          for (const nestedError of error.children) {
            msg += `Error on property ${nestedError.property} with ${nestedError.constraints} \n`;
          }
        }
      }
      exception.message = msg;
    }

    this.logger.error(`${exception.message} => ${JSON.stringify(value)}`);

    return throwError(exception.getError());
  }
}
