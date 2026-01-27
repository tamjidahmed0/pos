import { IsNumber, IsString, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  sku: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock_quantity: number;

  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsNumber()
  id: number;

  @IsDateString()
  date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto) 
  items: OrderItemDto[];

  @IsNumber()
  total: number;
}