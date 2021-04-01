import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableHighlight } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

export default (props) => {
    
    const [status, setStatus] = useState('');
    const [exibirDados, setExibirDados] = useState(false);
    
    const [temperatura, setTemperatura] = useState(0);
    const [umidade, setUmidade] = useState(0);

    useEffect(async () => {
        await atualizar();
    }, []);
    
    async function atualizar(){

        const url = await AsyncStorage.getItem('url');
        const tempo = await AsyncStorage.getItem('tempo');
        
        setStatus('Conectando-se a ' + url.replace('http://','') + '...');

        //Consulta API
        try {
            const response = await Axios.get(url);

            setTemperatura(response.data.temperatura);
            setUmidade(response.data.umidade);
        } catch (error) {
            setExibirDados(false);
            setStatus('Erro ao consultar dados.');
            Alert.alert('Erro ao consultar dados: ' + error);
        }

        setExibirDados(true);

        statusSecagem();

        setTimeout(() => {
            atualizar();
        }, tempo * 1000 * 60);
    }

    function statusSecagem(){
        if(temperatura < 40){
            setStatus('Secadora desligada');
        } else if(umidade < 11){
            setStatus('Roupa seca!!');
        } else {
            setStatus('Secagem em andamento');
        }
    }

    return <View style={styles.container}>
        
        <Text style={styles.titulo}>Secadora IoT</Text>

        <Text style={styles.status}>{status}</Text>
        
        <View>
            
            <View style={exibirDados ? null : styles.displayNone}>
                <View>
                    <Text style={styles.subTitulo}>Temperatura</Text>
                    <Text style={styles.dado}>{temperatura} °C</Text>
                </View>

                <View>
                    <Text style={[styles.subTitulo, styles.espacamento]}>Umidade</Text>
                    <Text style={styles.dado}>{umidade} %</Text>
                </View>
            </View>

            <TouchableHighlight style={styles.botaoAtualizar} onPress={atualizar}>
                <View style={styles.botaoAtualizarView}>
                    <Ionicons name={'sync-outline'} size={19} color={'#888'} style={styles.botaoAtualizarIcon} />
                    <Text>Atualizar</Text>
                </View>
            </TouchableHighlight>

            <View>
                <Text style={styles.creditos}>Desenvolvido por Wilson Faustino Filho</Text>
            </View>

        </View>
    </View>;

};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
    },
    displayNone:{
        display: 'none'
    },
    titulo:{
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    status:{
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 50
    },
    subTitulo:{
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    dado:{
        fontSize: 35,
        textAlign: 'center'
    },
    espacamento:{
        marginTop: 25
    },
    botaoAtualizar:{
        marginTop: 35,
        alignSelf: 'center',
        backgroundColor: '#ccc',
        paddingHorizontal: 13,
        paddingVertical: 7
    },
    botaoAtualizarView:{
        flexDirection: 'row'
    },
    botaoAtualizarIcon:{
        marginRight: 8
    },
    creditos:{
        textAlign: 'center',
        color: '#888',
        marginTop: 30,
        fontSize: 12
    }
});