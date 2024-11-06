import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Texto from "../../../Components/Texto";

export default function Detalhes ({logo_estab, nome, nome_desc, valor, comprar}){
    return<>
        <View style={estilos.lista_logo}>
            <Image source={ logo_estab } style={estilos.logo_estab}/>
            <Texto style={estilos.nome}>{ nome }</Texto>
        </View>
            
        
        <Texto style={estilos.valor}>{ valor } </Texto>
        {/*<TouchableOpacity style={estilos.comprar} onPress={() => {}}>
            <Texto style={estilos.nome_desc}>{ nome_desc }</Texto>
            <Texto style={estilos.texto_comprar}>{comprar}</Texto>
        </TouchableOpacity>*/}
    </>

}

const estilos = StyleSheet.create({
    nome: {
        color: "#464646",
        fontSize: 16,
        lineHeight: 38,
        fontWeight: "normal",
        marginLeft: 12,
    },
    logo_estab: {
        width: 40,
        height: 40,
    },
    lista_logo:{
        flexDirection: "row",
        paddingVertical: 12,
    },
    nome_desc:{
        color: "#A3A3A3",
        fontSize: 16,
        lineHeight: 26,
    },
    valor:  {
        color: "#2A9F85",
        fontWeight: "normal",
        fontSize: 24,
        lineHeight: 24,
        
        marginTop: 10,

    },
    comprar:{
        marginTop: 16,
        backgroundColor: "#2A9F85",
        paddingVertical: 16,
        borderRadius: 6,
    },
    texto_comprar:{
        textAlign: "center",
        color: "#ffffff",
        fontSize: 16,
        lineHeight: 26,
        fontWeight: "bold"
    }
})