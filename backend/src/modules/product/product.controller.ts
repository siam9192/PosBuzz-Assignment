import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import type { Request } from 'express';
import { pick } from 'src/common/helpers/utils.helper';
import { paginationOptionPicker } from 'src/common/helpers/pagination.helper';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async created(@Body() dto: CreateProductDto) {
    const result = await this.productService.create(dto);
    return {
      success: true,
      message: 'Product created successfully',
      data: result,
    };
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(@Body() dto: UpdateProductDto, @Req() req: Request) {
    const result = await this.productService.update(
      req.params.id as string,
      dto,
    );
    return {
      success: true,
      message: 'Product updated successfully',
      data: result,
    };
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async delete(@Req() req: Request) {
    const result = await this.productService.delete(req.params.id as string);
    return {
      success: true,
      message: 'Product deleted successfully',
      data: null,
    };
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: Request) {
    const result = await this.productService.findAll(
      pick(req.query, ['searchTerm', 'minPrice', 'maxPrice']),
      paginationOptionPicker(req.query),
    );
    return {
      success: true,
      message: 'Products retrieved successfully',
      data: result,
    };
  }
}
