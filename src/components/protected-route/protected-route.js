import { Navigate, Route, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/utils';

export function ProtectedRoute({ children, ...rest }) {
  const cookie = getCookie('token');
  const location = useLocation();

  if (!cookie){
      return <Navigate replace
                       to={{
                         pathname: '/login',
                         state: { from: location }
                       }}
      />
  }

  return children;
}