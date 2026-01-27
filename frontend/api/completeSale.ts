/// <reference types="vite/client" />
import type { Sale } from '../src/types';
import Cookies from 'js-cookie'
const apiUrl = import.meta.env.VITE_API_URL;



export const completeSale = async (sale: Sale) => {
  const token = Cookies.get('access_token')

  const res = await fetch(`${apiUrl}/sales/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sale),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to complete sale');
  }

  return res.json();
};
