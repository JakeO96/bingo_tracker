/* eslint-disable no-constant-binary-expression */
import { createContext, useState } from 'react';
import type { CreateUserRequest, LogInRequest, LogInResponse, LogOutResponse } from '../shared/types/api/userAuth';
import { expressApi } from './express-api';

type AuthContextType = {
  isLoggedIn: boolean;
  currentClientUsername: string;
  logIn: (fields: LogInRequest) => Promise<boolean | undefined>;
  logOut: () => Promise<LogOutResponse>;
  register: (fields: CreateUserRequest) => Promise<boolean | undefined>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  currentClientUsername: '',
  logIn: async () => true || false,
  logOut: async () => ({ message: '' }),
  register: async () => true || false,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isUserLoggedIn);
  const [currentClientUsername, setCurrentClientUsername] = useState<string>('')

  const logIn = async (fields: LogInRequest) => {
    try {
      const data: LogInResponse = await expressApi.userAuth.logUserIn(fields);
      console.log(data)

      if (data.username) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', data.username);
        setCurrentClientUsername(data.username);
        setIsLoggedIn(true);
        return true;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logOut = async () => {
    const res = await expressApi.userAuth.logUserOut()

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setCurrentClientUsername('');
    setIsLoggedIn(false);

    return res
  };

  const register = async (fields: CreateUserRequest) => {
    try {
      const res = await expressApi.userAuth.createUser(fields)
      console.log(res)
      return true;
    } catch (err) {
      console.error(err)
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentClientUsername, logIn, logOut, register }}>
      {children}
    </AuthContext.Provider>
  );
};