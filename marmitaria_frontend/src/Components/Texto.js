import { Montserrat_100Thin, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { processFontFamily } from "expo-font";
import React from "react";
import { StyleSheet, Text } from "react-native";

export default function Texto({children,style}){
    let estilo = estilos.texto;
    if (style?.fontWeight === "bold"){
        estilo = estilos.textoNegrito;
    }

    return <Text style={[style, estilo]}>{children}</Text>
}

const estilos = StyleSheet.create({
    texto:{
        fontFamily: "MontserratRegular",
        
    },
    textoNegrito: {
        
        fontFamily: "MontserratBold",
        fontWeight: "normal",
    }
})