import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';

export default (props) => {

    return <View style={styles.container}>
        
        <Text style={styles.titulo}>Secadora IoT</Text>

        <Text style={styles.status}>-</Text>
        
        <View>
            
            <View>
                <Text style={styles.subTitulo}>Temperatura</Text>
                <Text style={styles.dado}>50 °C</Text>
            </View>

            <View>
                <Text style={[styles.subTitulo, styles.espacamento]}>Umidade</Text>
                <Text style={styles.dado}>50 %</Text>
            </View>

            <TouchableHighlight style={styles.botaoAtualizar}>
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
        textAlign: 'center',
    },
    dado:{
        fontSize: 35,
        textAlign: 'center',
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