import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMutation } from 'react-query';
import { getUserInfoByCookie, logout } from '../ CRUD/Auth';

const AuthContextType = {
  user: null,
  isLoading: false,
  isAuth: false,
  error: null,
  // eslint-disable-next-line no-unused-vars
  loginFn: (success, data) => {},
  registrationFn: () => {},
  logoutFn: () => {},
};

const AuthContext = createContext(AuthContextType);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isAuth, setAuth] = useState(false);

  const getUser = useMutation(
    'getUser',
    () => getUserInfoByCookie(),
    {
      onSuccess: (data) => {
        if (!data?.data?.user?.profileId) {
          setAuth(false);
        } else {
          setUser({ user: data?.data?.user, ...user });
          setAuth(true);
        }
        setLoading(false);
      },
    },
  );

  useEffect(() => {
    setLoading(true);
    getUser.mutate();
  }, []);

  const logoutQuery = useMutation(
    'logout',
    () => logout(),
    {
      onSuccess: () => {
        setAuth(false);
        setUser(null);
        localStorage.removeItem('token');
        setLoading(false);
      },
    },
  );

  const loginFn = (success, data = null) => {
    if (data) {
      localStorage.setItem('token', data.newAccessToken);
      setUser(data);
    }
    setAuth(success);
    setLoading(false);
  };

  const registrationFn = () => {
    setLoading(false);
  };

  const logoutFn = () => {
    setLoading(true);
    logoutQuery.mutate();
  };

  const memoValue = useMemo(
    () => ({
      user,
      isLoading,
      isAuth,
      setLoading,
      loginFn,
      registrationFn,
      logoutFn,
    }),
    [user, isLoading, isAuth],
  );

  return (
    <AuthContext.Provider value={memoValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() { return useContext(AuthContext); }
