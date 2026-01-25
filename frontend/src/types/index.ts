export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock_quantity: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Sale {
  id: number;
  date: string;
  items: CartItem[];
  total: number;
}

export interface ProductFormData {
  name: string;
  sku: string;
  price: number;
  stock_quantity: number;
}
