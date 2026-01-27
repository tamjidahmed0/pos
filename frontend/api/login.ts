/// <reference types="vite/client" />
const API_BASE_URL = import.meta.env.VITE_API_URL
import Cookies from 'js-cookie'

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Login failed')

  Cookies.set('access_token', data.access_token, { expires: 1 / 48 }) // 30 min

  return data
}
