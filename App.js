import React from 'react';

import Root from './src/screens/navigation';
import AuthContextProvider from './src/context/auth-context';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </AuthContextProvider>
  );
}

export default App;
