/// <reference types="vite/client" />
import type { ProductFormData } from '../src/types';
import Cookies from 'js-cookie'

const apiUrl = import.meta.env.VITE_API_URL;


export const updateProduct = async (
  id: number,
  dto: ProductFormData
) => {
  const { name, price, sku, stock_quantity } = dto;
  const token = Cookies.get('access_token')

  const res = await fetch(`${apiUrl}/product/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, price, sku, stock_quantity }),
  });

  if (!res.ok) {
    throw new Error('Failed to update product');
  }

  return res.json();
};
