import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDTO } from './sale.dto';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async created(@Body() dto: CreateSaleDTO) {
    const result = await this.saleService.create(dto);
    return {
      success: true,
      message: 'Sale created successfully',
      data: result,
    };
  }
}
