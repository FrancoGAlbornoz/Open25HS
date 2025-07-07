import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Swal from 'sweetalert2'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      agregarAlCarrito: (producto) => {
        const { idProducto, cantidad = 1, stock } = producto
        const existe = get().items.find(p => p.idProducto === idProducto)

        if (existe) {
          if (existe.cantidad + cantidad > stock) {
            Swal.fire({icon: 'warning', title: 'Stock insuficiente', text: `No hay stock suficiente para ${producto.nombre}`, confirmButtonColor: '#d33',});
            return;
          }
          set({
            items: get().items.map(p =>
              p.idProducto === idProducto
                ? { ...p, cantidad: p.cantidad + cantidad }
                : p
            ),
          });
        } else {
          if (cantidad > stock) {
            Swal.fire({icon: 'warning', title: 'Stock insuficiente', text: `No hay stock suficiente para ${producto.nombre}`, confirmButtonColor: '#d33',});
            return;
          }
          set({
            items: [...get().items, { ...producto, cantidad }],
          });
        }
      },

      quitarDelCarrito: (id) => {
        Swal.fire({ icon: 'info', title: 'Producto eliminado', timer: 1200, showConfirmButton: false,});
        set({
          items: get().items.filter(p => p.idProducto !== id),
        });
      },

      vaciarCarrito: () => {
        set({ items: [] });
      },

      incrementarCantidad: (idProducto) => {
        set((state) => {
          const item = state.items.find(i => i.idProducto === idProducto);
          if (!item) return state;

          if (item.cantidad < item.stock) {
            return {
              items: state.items.map(i =>
                i.idProducto === idProducto
                  ? { ...i, cantidad: i.cantidad + 1 }
                  : i
              ),
            };
          } else {
            Swal.fire({ icon: 'error', title: 'Sin stock', text: 'No hay stock suficiente para este producto', confirmButtonColor: '#d33',});
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
            .filter((item) => item.cantidad > 0),
        }));
      },
    }),
    {
      name: 'carrito-storage',
    }
  )
);

export default useCartStore;