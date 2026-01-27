/// <reference types="vite/client" />
const apiUrl = import.meta.env.VITE_API_URL;
import Cookies from 'js-cookie'



export const getStats = async () => {
  const token = Cookies.get('access_token')

  const res = await fetch(`${apiUrl}/stats`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch stats');
  }

  return res.json();
};
