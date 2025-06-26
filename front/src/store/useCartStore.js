import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(persist(
  (set, get) => ({
    items: [],
    agregarAlCarrito: (producto) => {
      alert("AGRREGADO")
      const existe = get().items.find(p => p.idProducto === producto.idProducto);
      if (existe) {
        set({
          items: get().items.map(p =>
            p.idProducto === producto.idProducto
              ? { ...p, cantidad: p.cantidad + 1 }
              : p
          )
        });
      } else {
        set({
          items: [...get().items, { ...producto, cantidad: 1 }]
        });
      }
    },
    quitarDelCarrito: (id) => {
      alert("Producto e")
      set({
        items: get().items.filter(p => p.idProducto !== id)
      });
    },
    vaciarCarrito: () => {
      set({ items: [] });
    }
  }),
  {
    name: 'carrito-storage', // 🔒 Nombre del almacenamiento en localStorage
  }
));

export default useCartStore;