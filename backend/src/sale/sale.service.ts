import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-sale-dto';

@Injectable()
export class SaleService {
  constructor(private prismaService: PrismaService) { }


  async completeSale(sale: CreateOrderDto) {

    if (!sale) throw new Error('Sale data missing');

    const items = Array.isArray(sale.items) ? sale.items : [sale.items];
    if (items.length === 0) throw new Error('No items found');

    //  Transaction
    await this.prismaService.$transaction(async (tx) => {
      // update stock for each item
      for (const item of items) {
        const updated = await tx.product.updateMany({
          where: {
            id: Number(item.id),
            stock_quantity: { gte: item.quantity },
          },
          data: {
            stock_quantity: { decrement: item.quantity },
          },
        });

        if (updated.count === 0) {
          throw new Error(`Insufficient stock or product not found (ID ${item.id})`);
        }
      }

      // create order
      const order = await tx.orderData.create({
        data: { data: sale as any, total: sale.total },

      });

      return order;
    });

    return {
      message: 'Sale completed successfully',
    };
  }



  async getSalesHistory() {
    const history = await this.prismaService.orderData.findMany();
    const sales = history.flatMap((item) => item.data as any[]);
    return sales;
  }


}
