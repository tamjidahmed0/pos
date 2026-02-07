/// <reference types="vite/client" />
const API_BASE_URL = import.meta.env.VITE_API_URL

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Login failed')


  return data
}
