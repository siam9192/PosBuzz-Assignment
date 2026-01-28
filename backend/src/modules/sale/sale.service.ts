import { prisma } from 'src/common/lib/prisma';
import { CreateSaleDTO } from './sale.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class SaleService {
  async create(dto: CreateSaleDTO) {
    const product = await prisma.product.findUnique({
      where: {
        id: dto.productId,
      },
      select: {
        id: true,
        price: true,
        stock_quantity: true,
      },
    });

    // Check product existence by SKU
    if (!product) throw new NotFoundException('Product not found');

    const stockAvailable = product.stock_quantity >= dto.quantity;

    // Check product stock availability
    if (!stockAvailable)
      throw new ForbiddenException('Required stock not available');

    return await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock_quantity: {
            decrement: dto.quantity,
          },
        },
      });

      return await tx.sale.create({
        data: {
          product_id: product.id,
          quantity: dto.quantity,
          total_price: product.price * dto.quantity,
        },
      });
    });
  }
}
