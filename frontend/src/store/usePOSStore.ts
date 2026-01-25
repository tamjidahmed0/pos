import { create } from 'zustand';
import type { Product, CartItem, Sale } from '../types';

interface POSStore {
  products: Product[];
  cart: CartItem[];
  salesHistory: Sale[];

  setProducts: (products: Product[]) => void;
  updateProduct: (id: number, data: Partial<Product>) => void;
  completeSale: () => Sale | null;
  addToCart: (product: Product) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;


}

export const usePOSStore = create<POSStore>((set, get) => ({
  products: [],
  salesHistory: [],
  cart: [],
  setProducts: (products) => set({ products }),


  updateProduct: (id, data) =>
    set({
      products: get().products.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    }),


  completeSale: () => {
    const { cart, products, salesHistory } = get();
    if (cart.length === 0) return null;

    const updatedProducts = products.map((product) => {
      const item = cart.find((c) => c.id === product.id);
      if (!item) return product;

      return {
        ...product,
        stock_quantity: product.stock_quantity - item.quantity,
      };
    });

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const sale = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cart,
      total: subtotal,
    };

    set({
      products: updatedProducts,
      salesHistory: [sale, ...salesHistory],
      cart: [],
    });

    return sale;
  },


  addToCart: (product) => {
    const cart = get().cart;
    if (product.stock_quantity === 0) return;

    const existing = cart.find((i) => i.id === product.id);
    if (existing) {
      if (existing.quantity >= product.stock_quantity) return;
      set({
        cart: cart.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },


  updateCartQuantity: (id, quantity) => {
    const cart = get().cart;
    const product = get().products.find((p) => p.id === id);
    if (!product) return;
    if (quantity > product.stock_quantity) return;
    if (quantity <= 0) {
      set({ cart: cart.filter((i) => i.id !== id) });
    } else {
      set({
        cart: cart.map((i) => (i.id === id ? { ...i, quantity } : i)),
      });
    }
  },


  removeFromCart: (id) => {
    set({ cart: get().cart.filter((i) => i.id !== id) });
  },


  clearCart: () => set({ cart: [] }),



}));
