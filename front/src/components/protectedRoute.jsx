import { Navigate } from 'react-router-dom';
import useLoginStore from '../store/useLoginStore';

const ProtectedRoute = ({ children, action, table }) => {
  const user = useLoginStore((state) => state.user);
  const hasPermission = useLoginStore((state) => state.hasPermission);

  if (!user) return <Navigate to="/login" replace />;
  if (action && table && !hasPermission(action, table)) {
    return <Navigate to="/error" replace />;
  }

  return children;
};

export default ProtectedRoute;
