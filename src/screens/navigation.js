import React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Screens from '../screens/index';
import {AuthContext} from '../context/auth-context';
import MaterialIcon from '../components/MaterialIcon';
import {getLogin} from '../utils/APIMethod';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function AuthenticatedBottomTab() {
  const getTabIcon = routeName => {
    const icons = {
      Home: 'home',
      Calendar: 'calendar-month',
      Profile: 'person',
    };
    return icons[routeName] || 'help';
  };

  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'lightgrey',
        tabBarIcon: ({focused}) => {
          return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <MaterialIcon
                name={getTabIcon(route.name)}
                type="material"
                color={focused ? 'black' : 'lightgrey'}
                size={24}
              />
            </View>
          );
        },
      })}>
      <BottomTab.Screen
        name="Home"
        component={Screens.HomeScreen}
        options={{tabBarLabel: 'Home'}}
      />
      <BottomTab.Screen
        name="Calendar"
        component={Screens.CalendarScreen}
        options={{tabBarLabel: 'Calendar'}}
      />
      <BottomTab.Screen
        name="Profile"
        component={Screens.ProfileScreen}
        options={{tabBarLabel: 'Profile'}}
      />
    </BottomTab.Navigator>
  );
}

function Authenticated() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="AuthenticatedBottomTab"
        component={AuthenticatedBottomTab}
      />
    </Stack.Navigator>
  );
}

function NotAuthenticated() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Screens.LoginScreen} />
    </Stack.Navigator>
  );
}

function CheckAuth() {
  const authCtx = React.useContext(AuthContext);
  const [authStatus, setAuthStatus] = React.useState(null);

  React.useEffect(() => {
    async function checkAsync() {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      if (email && password) {
        setTimeout(async () => {
          const response = await getLogin(email, password);
          if (response) {
            await authCtx.login(email, password);
            setAuthStatus(true);
          } else {
            setAuthStatus(false);
            await AsyncStorage.clear();
          }
        }, 1000);
      } else {
        setAuthStatus(false);
      }
    }

    checkAsync();
  }, [authCtx.email, authCtx.password]);

  return (
    <>
      {authStatus === true && <Authenticated />}
      {authStatus === false && <NotAuthenticated />}
    </>
  );
}

function Root() {
  return <CheckAuth />;
}

export default Root;
