import { IsInt, IsNotEmpty, IsNumber, Min, IsString } from 'class-validator';

export class CartItemDto {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  stock_quantity: number;

  @IsInt()
  @Min(1)
  quantity: number; 
}
