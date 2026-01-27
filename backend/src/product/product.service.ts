import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(private readonly prismaService: PrismaService) { }

    async addProduct({ name, price, sku, stock_quantity }: CreateProductDto) {
        return await this.prismaService.product.create({
            data: {
                name,
                price,
                sku,
                stock_quantity
            }
        })
    }

    async getAllProducts(search?: string) {
        const keyword = search?.trim();

        return this.prismaService.product.findMany({
            where: keyword
                ? {
                    OR: [
                        {
                            name: {
                                contains: keyword,
                                mode: 'insensitive',
                            },
                        },
                        {
                            sku: {
                                contains: keyword,
                                mode: 'insensitive',
                            },
                        },
                    ],
                }
                : {},
            orderBy: {
                createdAt: 'desc',
            },
        });
    }


    async update(id: number, data: UpdateProductDto) {
        const product = await this.prismaService.product.findUnique({ where: { id } });
        if (!product) throw new NotFoundException('Product not found');

        return this.prismaService.product.update({
            where: { id },
            data,
        });
    }


    async delete(id: number) {
        try {
            return await this.prismaService.product.delete({
                where: { id },
            });
        } catch (error) {
            return null;
        }
    }





}
