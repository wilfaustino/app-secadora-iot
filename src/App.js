import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Tab from './Navegacao/Tab';

export default function App(){

    return <SafeAreaView style={styles.appBody}>
        <NavigationContainer>
            <Tab></Tab>
        </NavigationContainer>
    </SafeAreaView>;

};

const styles = StyleSheet.create({
    appBody:{
        flex: 1
    }
});