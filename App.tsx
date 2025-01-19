import React, {useEffect, useMemo, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoard from './src/screens/onBoard';
import Login from './src/screens/login';
import Dashboard from './src/screens/dashboard';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {AuthContext} from './src/utils/auth';
import {ActivityIndicator, Image, View} from 'react-native';
import {initialLoginState, loginReducer} from './src/utils/constants';
import {colorResources} from './src/utils/colorResources';
import {Images} from './src/utils/images';

const App = () => {
  // navigation stack initialized
  const Stack = createNativeStackNavigator();

  // Authentication flow implemented
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
  const authContext = useMemo(
    () => ({
      signIn: async (ID: any) => {
        dispatch({type: 'SETLOADING', isLoading: true});
        let userToken = 'LoggedIn';
        await RNSecureStorage.setItem('userToken', userToken, {
          accessible: ACCESSIBLE.WHEN_UNLOCKED,
        })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });

        let userBoard = 'Onboarded';
        await RNSecureStorage.setItem('userBoard', userBoard, {
          accessible: ACCESSIBLE.WHEN_UNLOCKED,
        })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });

        dispatch({
          type: 'LOGIN',
          id: ID,
          token: userToken,
          userBoard: userBoard,
        });
      },

      onBoard: async () => {
        dispatch({type: 'SETLOADING', isLoading: true});
        let userBoard = 'Onboarded';
        await RNSecureStorage.setItem('userBoard', userBoard, {
          accessible: ACCESSIBLE.WHEN_UNLOCKED,
        })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        dispatch({type: 'ONBOARD', userBoard: userBoard});
      },

      signOut: async () => {
        dispatch({type: 'SETLOADING', isLoading: true});
        RNSecureStorage.removeItem('userToken')
          .then(res => {
            console.log(res);
            dispatch({type: 'LOGOUT'});
          })
          .catch(err => {
            console.log(err);
          });

        console.log('logged out');
      },
    }),
    [],
  );

  useEffect(() => {
    // Checking whether the user is already onboarded or logged in
    setTimeout(async () => {
      let userBoard = null;
      let userToken = null;
      try {
        userBoard = await RNSecureStorage.getItem('userBoard');
        userToken = await RNSecureStorage.getItem('userToken');
        console.log(userBoard);
        console.log(userToken);
      } catch (error) {
        // Error saving data
        console.log(error);
      }

      dispatch({type: 'REGISTER', token: userToken, userBoard: userBoard});
    }, 2000);
  }, []);

  // splash screen
  if (loginState.isLoading) {
    console.log('2');
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colorResources.elephantBlack,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={Images.logo}
          style={{height: 50, width: 200, marginBottom: 10}}
        />

        <ActivityIndicator size={'large'} color={colorResources.grey} />
      </View>
    );
  }

  return (
    // routing stack
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {loginState.userBoard && loginState.userToken ? (
            <Stack.Screen name="dashboard" component={Dashboard} />
          ) : loginState.userBoard ? (
            <Stack.Screen name="login" component={Login} />
          ) : (
            <Stack.Screen name="onBoard" component={OnBoard} />
          )}
          <Stack.Screen name="loginGuest" component={Login} />
          <Stack.Screen name="dashboardGuest" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
