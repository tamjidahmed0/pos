/// <reference types="vite/client" />
import type {ProductFormData} from '../src/types/index.ts';
const apiUrl = import.meta.env.VITE_API_URL;
import Cookies from 'js-cookie'

export const AddProduct = async (data :ProductFormData) => {
  const token = Cookies.get('access_token');

  const res = await fetch(`${apiUrl}/product/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
       Authorization: `Bearer ${token}`,
      
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error('Failed to complete sale');
  }

  return res.json();
};
