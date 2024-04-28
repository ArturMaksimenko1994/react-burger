import { Navigate, Route, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/utils';

export function ProtectedRoute({ children, ...rest }) {
  const cookie = getCookie('token');
  const location = useLocation();

  return (
    <Route
      {...rest}
      element={cookie ? children : <Navigate to="/login" replace state={{ from: location }} />}
    />
  );
}
