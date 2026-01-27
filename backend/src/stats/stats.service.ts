import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatsService {
    constructor(private prismaService: PrismaService) { }


    async getStats() {
        const totalProducts = await this.prismaService.product.count();
        const totalStock = await this.prismaService.product.aggregate({
            _sum: {
                stock_quantity: true
            }
        });
        const totalTransactions = await this.prismaService.orderData.count();

        const totalSalseAmount = await this.prismaService.orderData.aggregate({
            _sum: {
                total: true
            }
        });

        return {
            totalProducts,
            totalStock: totalStock._sum.stock_quantity || 0,
            totalTransactions,
            totalSalseAmount: totalSalseAmount._sum.total || 0
        };



    }

}
