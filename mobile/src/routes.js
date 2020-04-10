import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';
import DeliveryDetails from '~/pages/DeliveryDetails';
import CreateDeliveryProblem from '~/pages/CreateDeliveryProblem';
import ViewDeliveryProblems from '~/pages/ViewDeliveryProblems';
import ConfirmDelivery from '~/pages/ConfirmDelivery';

export default (signedIn = true) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: createBottomTabNavigator(
          {
            Deliveries: {
              screen: createStackNavigator(
                {
                  Deliveries,
                  DeliveryDetails,
                  CreateDeliveryProblem,
                  ViewDeliveryProblems,
                  ConfirmDelivery,
                },
                {
                  defaultNavigationOptions: {
                    headerStyle: {
                      backgroundColor: '#7D40E7',
                      shadowColor: '#5bc4ff',
                      shadowOpacity: 0,
                      shadowOffset: {
                        height: 0,
                      },
                      shadowRadius: 0,
                      elevation: 0,
                    },
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Entregas',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="menu" size={30} color={tintColor} />
                ),
              },
            },
            Profile: {
              screen: Profile,
              navigationOptions: {
                tabBarLabel: 'Meu Perfil',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="account-circle" size={30} color={tintColor} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#7D40E7',
              style: {
                backgroundColor: '#fff',
              },
              inactiveTintColor: '#999',
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'SignIn',
      }
    )
  );
