const apiUrl = import.meta.env.VITE_API_URL;
import Cookies from 'js-cookie'


export const fetchSalesHistory = async () => {
    const token = Cookies.get('access_token')

    const res = await fetch(`${apiUrl}/sales/history`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch sales history');
    }

    return res.json();
};
