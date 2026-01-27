import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }


    @Post('create')
    async createProduct(@Body() createProductDto: CreateProductDto) {
        try {
            return await this.productService.addProduct(createProductDto);
        } catch (error) {
            console.log(error)
            if (error.code === 'P2002') {
                return { message: 'Product with this SKU already exists' };
            }
            return { message: 'An error occurred while creating the product' };
        }
    }


    @Get('all')
    async getAllProducts(@Query('search') search?: string) {
        try {
            return await this.productService.getAllProducts(search);
        } catch (error) {
            console.log(error)
        }
    }



    @Patch(':id')
    async update(@Param('id') id: string, @Body() body: UpdateProductDto) {
        const productId = parseInt(id, 10);
        const updated = await this.productService.update(productId, body);

        if (!updated) {
            throw new NotFoundException('Product not found');
        }

        return updated;
    }


    @Delete(':id')
    async delete(@Param('id') id: string) {
        const productId = parseInt(id, 10);
        const deleted = await this.productService.delete(productId);

        if (!deleted) {
            throw new NotFoundException('Product not found');
        }

        return { message: 'Product deleted successfully' };
    }


}



