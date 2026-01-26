import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';
import { ProductController } from './modules/product/product.controller';
import { ProductService } from './modules/product/product.service';
import { SaleController } from './modules/sale/sale.controller';
import { SaleService } from './modules/sale/sale.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    AuthController,
    ProductController,
    SaleController,
  ],
  providers: [AppService, AuthService, ProductService, SaleService],
})
export class AppModule {}
