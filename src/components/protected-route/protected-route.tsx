import React, {FC, ReactNode} from "react";
import {Navigate, useLocation} from 'react-router-dom';
import {getCookie} from '../../utils/utils';

interface Props {
  children: ReactNode;
}

export const ProtectedRoute: FC<Props> = ({children, ...rest}) => {
  const cookie = getCookie('token');
  const location = useLocation();

  if (!cookie) {
    return <Navigate
      replace
      to="/login"
      state={{from: location}}
    />
  }
  return <>{children}</>;
}
