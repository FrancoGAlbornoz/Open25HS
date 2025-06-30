import { create } from 'zustand'
import { persist } from 'zustand/middleware' 
// persistsirve para guardar el estado del usuario en el almacenamiento local del navegador

//

const useLoginStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),
      //verifica si el usuario tiene permisos para realizar una acción en una tabla específica
      //recive accion y tabl, acciones a realizar en una tabla especifica
      hasPermission: (action, table) => {
        const { user } = get()
        if (!user) return false

        // Permisos por rol y acción
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

        return permissions[user.rol]?.[table]?.includes(action)
      },
    }),
    {
      name: 'user-storage', // nombre del key en localStorage
      partialize: (state) => ({ user: state.user }), // solo persiste 'user'
    }
  )
);

export default useLoginStore;