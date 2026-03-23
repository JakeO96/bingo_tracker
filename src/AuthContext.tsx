/* eslint-disable no-constant-binary-expression */
import { createContext, useState } from 'react';
import expressApi from './express-api';

type AuthContextType = {
  isLoggedIn: boolean;
  currentClientUsername: string;
  logIn: (fields: { email: string; password: string }) => Promise<boolean | undefined>;
  logOut: () => Promise<boolean | undefined>;
  register: (fields: { email: string; username: string; password: string }) => Promise<boolean | undefined>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  currentClientUsername: '',
  logIn: async () => true || false,
  logOut: async () => true || false,
  register: async () => true || false,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isUserLoggedIn);
  const [currentClientUsername, setCurrentClientUsername] = useState<string>('')

  const logIn = async (fields: { email: string; password: string }) => {
    try {
      const data = await expressApi.logUserIn(fields);

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
    try {
      await expressApi.logUserOut();
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      setCurrentClientUsername('');
      setIsLoggedIn(false);
      return true;
    } catch (err) {
      console.error(err)
      return false;
    }
  };

  const register = async (fields: { email: string; username: string; password: string }) => {
    try {
      const res = await expressApi.createUser(fields);
      console.log(res);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentClientUsername, logIn, logOut, register }}>
      {children}
    </AuthContext.Provider>
  );
};