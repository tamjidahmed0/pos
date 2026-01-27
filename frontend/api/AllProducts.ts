const apiUrl = import.meta.env.VITE_API_URL;
import Cookies from 'js-cookie'


export const fetchAllProducts = async () => {
    const token = Cookies.get('access_token')

    const res = await fetch(`${apiUrl}/product/all`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    return res.json();
};
