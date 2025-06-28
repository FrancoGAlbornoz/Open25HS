import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLoginStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),

      hasPermission: (action, table) => {
        const { user } = get();
        if (!user) return false;

        const permissions = {
          Administrador: {
            Producto: ['view', 'create', 'edit', 'delete'],
            Usuario: ['view', 'edit', 'create', 'delete'],
            Pedido: ['view', 'edit', 'delete'], 
          },
          Empleado: {
            Producto: ['view', 'create', 'edit', 'delete'],
            Pedido: ['view', 'edit', 'delete'], 
          },
          Cliente: {
            Producto: ['view'],
            Cliente: ['view', 'edit'],
            Carrito: ['create'],
          },
        };

        return permissions[user.rol]?.[table]?.includes(action);
      },
    }),
    {
      name: 'user-storage', // nombre del key en localStorage
      partialize: (state) => ({ user: state.user }), // solo persiste 'user'
    }
  )
);

export default useLoginStore;