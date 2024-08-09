import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any | HttpException, host: any) {
    console.log('exception', exception);
    const response = host.switchToHttp().getResponse();
    if (exception instanceof HttpException) {
      const res = {
        errors: exception.message,
        stack: exception.getResponse(),
      };
      response.status(exception.getStatus()).json(res);
    } else if (exception instanceof ZodError) {
      response.status(400).json({
        errors: exception?.errors?.map((error) => {
          return `${error.path.join('.')} ${error.message}`;
        }),
      });
    } else {
      response.status(500).json({
        errors: exception.message,
      });
    }
  }
}
