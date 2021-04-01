import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableHighlight, ImageBackground } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

import imagemFundo from '../../assets/fundo.jpg'

export default (props) => {
    
    const [status, setStatus] = useState('');
    const [exibirDados, setExibirDados] = useState(false);
    
    const [temperatura, setTemperatura] = useState(0);
    const [umidade, setUmidade] = useState(0);

    useEffect(async () => {
        await atualizar();
    }, []);
    
    async function atualizar(atualizaProximo = true){

        const url = await AsyncStorage.getItem('url');
        const tempo = await AsyncStorage.getItem('tempo');

        let temp, umid;

        //Configuração inicial
        if(url == '' || tempo == '' || tempo == 0){
            setStatus('Configure o aplicativo!');
            return;
        }
        
        setStatus('Conectando-se a ' + url.replace('http://','') + '...');

        //Consulta API
        try {
            const response = await Axios.get(url);

            temp = response.data.temperatura;
            umid = response.data.umidade;

            setTemperatura(temp);
            setUmidade(umid);
        } catch (error) {
            setExibirDados(false);
            setStatus('Erro ao consultar dados');
            //Alert.alert('Erro ao consultar dados: ' + error);
        }

        setExibirDados(true);

        await statusSecagem(temp, umid);

        if(atualizaProximo){
            setTimeout(() => {
                atualizar();
            }, tempo * 1000 * 60);
        }
    }

    async function statusSecagem(temp, umid){
        if(temp < 40){
            setStatus('Secadora desligada');
        } else if(umid < 11){
            setStatus('Roupa seca!!');
        } else {
            setStatus('Secagem em andamento');
        }
    }

    return <View style={styles.container}>
        
        <ImageBackground style={styles.cabecalho} source={imagemFundo}>
            <Text style={styles.titulo}>Secadora IoT</Text>
        </ImageBackground>

        <View style={styles.corpo}>
            
            <Text style={styles.status}>{status}</Text>
            
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

            <TouchableHighlight style={styles.botaoAtualizar} onPress={() => atualizar(false)}>
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
    cabecalho: {
        flex: 1,
        justifyContent: 'center'
    },
    corpo: {
        flex: 4
    },
    displayNone:{
        display: 'none'
    },
    titulo:{
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {
            width: -1,
            height: 1
        },
        textShadowRadius: 20
    },
    status:{
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 25
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