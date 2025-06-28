import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(persist(
  (set, get) => ({
    items: [],
    agregarAlCarrito: (producto) => {
      const { idProducto, cantidad = 1, stock } = producto;
    
      const existe = get().items.find(p => p.idProducto === idProducto);
    
      if (existe) {
        if (existe.cantidad + cantidad > stock) {
          alert(`No hay stock suficiente para ${producto.nombre}`);
          return; // salir sin actualizar
        }
        set({
          items: get().items.map(p =>
            p.idProducto === idProducto
              ? { ...p, cantidad: p.cantidad + cantidad }
              : p
          )
        });
      } else {
        if (cantidad > stock) {
          alert(`No hay stock suficiente para ${producto.nombre}`);
          return;
        }
        set({
          items: [...get().items, { ...producto, cantidad }]
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
    },
    incrementarCantidad: (idProducto) => {
      set((state) => {
        const item = state.items.find(i => i.idProducto === idProducto);
        if (!item) return state;
    
        if (item.cantidad < item.stock) { // <--- validación de stock
          return {
            items: state.items.map(i =>
              i.idProducto === idProducto
                ? { ...i, cantidad: i.cantidad + 1 }
                : i
            )
          };
        } else {
          alert('No hay stock suficiente para este producto');
          return state;
        }
      });
    },
    
    disminuirCantidad: (idProducto) => {
      set((state) => ({
        items: state.items
          .map((item) =>
            item.idProducto === idProducto
              ? { ...item, cantidad: item.cantidad - 1 }
              : item
          )
          .filter((item) => item.cantidad > 0), // elimina si la cantidad baja a 0
      }));
    },

  }),
  {
    name: 'carrito-storage', // 🔒 Nombre del almacenamiento en localStorage
  }
));

export default useCartStore;