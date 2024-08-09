import { ExceptionFilter, HttpException } from '@nestjs/common';
export declare class ErrorFilter implements ExceptionFilter {
    catch(exception: any | HttpException, host: any): void;
}
