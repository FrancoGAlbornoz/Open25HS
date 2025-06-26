import { Navigate } from 'react-router-dom';
import useLoginStore from '../store/useLoginStore';

const ProtectedRoute = ({ children, allowedRoles=[],action, table }) => {
  const user = useLoginStore((state) => state.user);
  const hasPermission = useLoginStore((state) => state.hasPermission);

    // Si no hay usuario logueado, manda al login
  if (!user) return <Navigate to="/login" replace />;

  // Si allowedRoles está definido y el rol del usuario no está en la lista, manda a unauthorized
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/error" replace />;
  }
  
  // Si hay acción y tabla, y el usuario no tiene permiso, manda a error
  if (action && table && !hasPermission(action, table)) {
    return <Navigate to="/error" replace />;
  }

  return children;
};

export default ProtectedRoute;
