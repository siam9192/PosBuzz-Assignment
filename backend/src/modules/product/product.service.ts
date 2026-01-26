import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { prisma } from 'src/common/lib/prisma';
import { ProductsFilterQuery } from './product.interface';
import {
  calculatePagination,
  PaginationOptions,
} from 'src/common/helpers/pagination.helper';
import { Prisma } from 'generated/prisma/browser';

@Injectable()
export class ProductService {
  async create(dto: CreateProductDto) {
    const isExistBySKU = (await prisma.product.findUnique({
      where: {
        sku: dto.sku,
      },
    }))!!;

    if (isExistBySKU) throw new ForbiddenException('SKU already exist');
    return await prisma.product.create({
      data: dto,
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true
      },
    });

    if (!product) throw new ForbiddenException('Product not found');

    return await prisma.product.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async delete(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!product) throw new ForbiddenException('Product not found');

    return await prisma.product.delete({ where: { id } });
  }
  async findAll(
    filterQuery: ProductsFilterQuery,
    paginationOpt: PaginationOptions,
  ) {
    const { page, limit, skip, sortBy, sortOrder } =
      calculatePagination(paginationOpt);
    const { searchTerm, minPrice, maxPrice } = filterQuery;

    const andConditions: Prisma.ProductWhereInput[] = [];

    // Search by name
    if (searchTerm && searchTerm.trim()) {
      andConditions.push({
        name: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      });
    }

    // Filter by price
    if (minPrice || maxPrice) {
      const priceCondition: Prisma.IntFilter = {};

      if (minPrice && !Number.isNaN(Number(minPrice))) {
        priceCondition.gte = Number(minPrice);
      }

      if (maxPrice && !Number.isNaN(Number(maxPrice))) {
        priceCondition.lte = Number(maxPrice);
      }

      if (Object.keys(priceCondition).length > 0) {
        andConditions.push({ price: priceCondition });
      }
    }

    const where: Prisma.ProductWhereInput = andConditions.length
      ? { AND: andConditions }
      : {};

    const products = await prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    });

    const total = await prisma.product.count({ where });

    return {
      data: products,
      meta: {
        page,
        limit,
        total,
      },
    };
  }
}
