import React from "react";
import { StyleSheet, TouchableOpacity, View} from "react-native";
import Texto from "../../../Components/Texto";
import { useNavigation } from '@react-navigation/native';

export default function Middle({botao_up, botao_middle, botao_down}) {
    const navigation =useNavigation();
    return <View style={estilos.container}>
        {/*Botão: Gerenciar Marmita*/}
        <TouchableOpacity style={estilos.botao} onPress={() => navigation.navigate ('Marmita')}>
            <Texto style={estilos.texto_botao}>{botao_up}</Texto>
        </TouchableOpacity>

        {/*Botão: Vendas*/}
        <TouchableOpacity style={estilos.botao} onPress={() => { navigation.navigate("Vendas")}}>
            <Texto style={estilos.texto_botao}>{botao_middle}</Texto>
        </TouchableOpacity>

        {/*Botão: Dashboard*/}
        <TouchableOpacity style={estilos.botao} onPress={() => { navigation.navigate("Dashboard") }}>
        {/* <TouchableOpacity style={estilos.botao}> */}
            <Texto style={estilos.texto_botao}>{botao_down}</Texto>
        </TouchableOpacity>
    </View>



}

const estilos = StyleSheet.create({
    botao: {
        marginTop: 15,
        backgroundColor: "#2A9F85",
        paddingVertical: 30,
        borderRadius: 15,
    },
    texto_botao: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        lineHeight: 26,
        fontWeight: "bold"
    },
    container: {
        paddingVertical: 16,
        marginHorizontal: 16,
        paddingTop: 120,
    }

})
