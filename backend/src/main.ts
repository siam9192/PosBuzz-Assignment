import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import redisClient from './common/lib/redis'
import cookieParser from 'cookie-parser'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.use(cookieParser()) 

  app.useGlobalInterceptors(new ResponseInterceptor()) 
  app.useGlobalFilters(new HttpExceptionFilter())

  await redisClient.connect()

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
