import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';
import { ProductController } from './modules/product/product.controller';
import { ProductService } from './modules/product/product.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController, ProductController],
  providers: [AppService, AuthService, ProductService],
})
export class AppModule {}
