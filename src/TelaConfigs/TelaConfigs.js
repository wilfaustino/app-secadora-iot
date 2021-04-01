import React from 'react';
import { View, Text, Switch, TextInput, StyleSheet, TouchableHighlight } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';

export default (props) => {

    return <View style={styles.container}>

        <Text style={styles.titulo}>Configurações</Text>
        
        <View style={styles.containerUnit}>
            <Text>URL</Text>
            <TextInput style={styles.inputs} />
        </View>
        
        <View style={[styles.containerUnit, styles.espacamento]}>
            <Text>Tempo de atualização</Text>
            <TextInput style={styles.inputs} value="1" keyboardType="numeric" />
        </View>

        <TouchableHighlight style={styles.botaoSalvar}>
            <View style={styles.botaoSalvarView}>
                <Ionicons name={'save-outline'} size={19} color={'#888'} style={styles.botaoSalvarIcon} />
                <Text>Salvar</Text>
            </View>
        </TouchableHighlight>

    </View>;

};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
    },
    containerUnit:{
        paddingHorizontal: 15
    },
    titulo:{
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 40
    },
    espacamento:{
        marginTop: 30
    },
    inputs:{
        borderBottomWidth: 1,
        borderBottomColor: '#000'
    },
    botaoSalvar:{
        marginTop: 30,
        alignSelf: 'center',
        backgroundColor: '#ccc',
        paddingHorizontal: 13,
        paddingVertical: 7
    },
    botaoSalvarView:{
        flexDirection: 'row'
    },
    botaoSalvarIcon:{
        marginRight: 8
    },
});