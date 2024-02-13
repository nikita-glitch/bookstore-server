import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { JsonWebTokenError, TokenExpiredError } from "@nestjs/jwt";
import { ValidationError } from "yup";

@Catch()
export class customExceptionFilter implements ExceptionFilter {
  
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.message;
      return res.status(status).json(message);
    }
    
    if (exception instanceof ValidationError) {
      return res.status(400).json({message: exception.errors});
    }

    if (exception instanceof JsonWebTokenError || exception instanceof TokenExpiredError) {
      return res.status(401).json({message: exception.message})
    }
    
    console.log('customExceptionFilter >', exception);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Unknown error' })
    
  }
}