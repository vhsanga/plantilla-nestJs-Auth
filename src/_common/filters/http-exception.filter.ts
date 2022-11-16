import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  
  @Catch()
  export class AllExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionFilter.name);
  
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      var  msg =
        exception instanceof HttpException ? exception.getResponse() : exception.toString();
      console.log(msg);
      //msg = exception.toString();

      if( exception instanceof HttpException ){
        msg = exception.getResponse();
      }else{
        msg = {
          "statusCode": 500,
          "message": [exception.toString()],
          "error": "Internal Server Error"
          }
      }

      this.logger.error(`Status ${status} Error: ${JSON.stringify(msg)}`);
  
      response.status(status).json({
        time: new Date().toISOString(),
        path: request.url,
        error: msg,
      });
    }
  }
  