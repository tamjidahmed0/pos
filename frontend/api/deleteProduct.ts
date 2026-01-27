const apiUrl = import.meta.env.VITE_API_URL;
import Cookies from 'js-cookie'



export const deleteProduct = async (id: number) => {
   const token = Cookies.get('access_token')
  const res = await fetch(`${apiUrl}/product/${id}`, {
    method: 'DELETE',
    headers:{
       Authorization: `Bearer ${token}`,
    }
  });

  if (!res.ok) {
    throw new Error('Failed to delete product');
  }

  return res.json();
};
