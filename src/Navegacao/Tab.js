import React from 'react'
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';

import TelaPrincipal from '../TelaPrincipal/TelaPrincipal'
import TelaConfigs from '../TelaConfigs/TelaConfigs'

const Tab = createBottomTabNavigator();

export default (props) => {

    return <Tab.Navigator

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Dados') {
                        iconName = 'bar-chart-outline';
                    } else if (route.name === 'Configurações') {
                        iconName = 'list-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}

            tabBarOptions={{
                activeTintColor: '#000',
                inactiveTintColor: '#888',
                labelStyle: { fontSize: 14 },
                style: {
                    minHeight: 60,
                    padding: 5,
                    paddingBottom: 3
                }
            }}

        >
        <Tab.Screen name="Dados" component={TelaPrincipal}></Tab.Screen>
        <Tab.Screen name="Configurações" component={TelaConfigs}></Tab.Screen>
    </Tab.Navigator>

}