import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext({
  email: null,
  password: null,
  login: async () => {},
  logout: async () => {},
});

function AuthContextProvider({children}) {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  async function login(email, password) {
    setEmail(email);
    setPassword(password);
  }

  async function logout() {
    try {
      setEmail(null);
      setPassword(null);
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }

  const value = {
    email: email,
    password: password,
    login: login,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
