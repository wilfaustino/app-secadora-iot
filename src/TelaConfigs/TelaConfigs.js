import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

export default (props) => {

    const [status, setStatus] = useState('');

    const [url, setUrl] = useState('');
    const [tempo, setTempo] = useState('1');

    useEffect(async () => {
        const _url = await AsyncStorage.getItem('url');
        const _tempo = await AsyncStorage.getItem('tempo');

        setUrl(_url);
        setTempo(_tempo);
    }, []);

    async function salvar(){

        //Validações URL
        if(url.length < 10 || url.indexOf('http://') == -1){
            Alert.alert('Preencha a URL');
            return;
        }

        //Validações tempo
        if(parseInt(tempo) < 1){
            Alert.alert('Preencha o tempo');
            return;
        }

        //Salvar
        await AsyncStorage.setItem('url', url);
        await AsyncStorage.setItem('tempo', tempo);

        setStatus('Configurações salvas com sucesso!');

        setTimeout(() => {
            setStatus('');
        }, 2500);
    }

    return <View style={styles.container}>

        <Text style={styles.titulo}>Configurações</Text>

        <Text style={styles.status}>{status}</Text>
        
        <View style={styles.containerUnit}>
            <Text>URL</Text>
            <TextInput style={styles.inputs} value={url} onChangeText={setUrl} />
        </View>
        
        <View style={[styles.containerUnit, styles.espacamento]}>
            <Text>Tempo de atualização em minutos</Text>
            <TextInput style={styles.inputs} value={tempo} onChangeText={(val) => setTempo(parseInt(val))} keyboardType="numeric" />
        </View>

        <TouchableHighlight style={styles.botaoSalvar} onPress={salvar}>
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
        fontWeight: 'bold'
    },
    status:{
        fontSize: 15,
        textAlign: 'center',
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