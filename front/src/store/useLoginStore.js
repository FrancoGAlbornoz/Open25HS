import {create} from 'zustand';

const useLoginStore = create((set,get) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),

  hasPermission: (action, table) => {
    const { user } = get(); // obtiene el usuario logueado desde el estado
    if (!user) return false; // si no hay usuario logueado, no tiene permiso

    const permissions = {
      Administrador: {
        Producto: ['view', 'create', 'edit', 'delete'], //CRUD
        Usuario: ['view', 'edit', 'create', 'delete'], //CRUD
        Cliente: ['view', 'edit', 'delete'] //RUD
      },
      Empleado: {
        Producto: ['view', 'create', 'edit'], //CRU
        Cliente: ['view', 'edit'] //RU
      },
      Cliente: {
        Producto: ['view'], //R
        Cliente: ['view', 'edit'] // puede ver/editar su propio perfil
      }
    };

    return permissions[user.rol]?.[table]?.includes(action);
  }

}));

export default useLoginStore;
