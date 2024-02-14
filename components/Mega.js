import React, { Component } from "react"
import { View, Text, TextInput, Button } from 'react-native'
import Estilo from './estilo'

import MegaNumero from './MegaNumero'

export default class Mega extends Component {

    state = {
        qtdeNumeros: this.props.qtdeNumeros,
        numeros: []
    }

    alterarQtdeNumero = (qtde) => {
        this.setState({ qtdeNumeros: +qtde })
    }

    gerarNumeroNaoContido = nums => {
        const novo = parseInt(Math.random() * 60) + 1
        return nums.includes(novo) ? this.gerarNumeroNaoContido(nums) : novo
    }

    gerarNumeros = () => {
        const numeros = Array(this.state.qtdeNumeros)
            .fill()
            .reduce(n => [...n, this.gerarNumeroNaoContido(n)], [])
            .sort((a, b) => a - b)
        this.setState({ numeros })
    }

    exibirNumeros = () => {
        const nums = this.state.numeros
        return nums.map(num => {
            return <MegaNumero key={num} num={num} />
        })
    }

    render() {
        return (
            <>
                <Text style={Estilo.txtG}>
                    Gerador de números da Mega-Sena
                </Text>
                <TextInput
                    keyboardType={'numeric'}
                    style={{
                        borderBottomWidth: 1,
                        marginBottom: 30,
                        marginTop: 30,
                        textAlign: "center"
                    }}
                    placeholder="Qtde de Números"
                    value={`${this.state.qtdeNumeros}`}
                    onChangeText={this.alterarQtdeNumero}
                />
                <Button
                    title='Gerar'
                    onPress={this.gerarNumeros}
                    style={{
                        marginTop: 10,
                    }}
                />
                <View style={{
                    marginTop: 70,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    {this.exibirNumeros()}
                </View>
            </>
        )
    }
}