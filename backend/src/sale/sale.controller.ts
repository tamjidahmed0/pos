import { Body, Controller, Get, Post } from '@nestjs/common';
import { SaleService } from './sale.service';

@Controller('sales')
export class SaleController {
    constructor(private saleService: SaleService) { }

    @Post('complete')
    async completeSale(@Body() dto: any) {
        try {
            const sale = await this.saleService.completeSale(dto);
            return sale;
        } catch (error) {
            return { message: error.message };
        }
    }


    @Get('history')
    async getSalesHistory() {
        try {
            const history = await this.saleService.getSalesHistory();
            return history;
        } catch (error) {

        }

    }
}
