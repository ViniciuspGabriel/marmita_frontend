import {React,  useState } from "react";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Texto from "../../../Components/Texto";
import { Ionicons } from '@expo/vector-icons';



{/*
const CustomCheckbox = ({ isChecked, onPress }) => (
    <TouchableOpacity style={estilos.checkboxBase} onPress={onPress}>
      {isChecked && <View style={estilos.checkboxBase}/>}
    </TouchableOpacity>
  );
*/}
export default function Itens({ item: { nome, imagem } }) {
  // const [isChecked, setIsChecked] = useState(false);
     
    return(      
        <View style={estilos.item}>

        {/*<View style={estilos.checkboxContainer}>
            <CustomCheckbox
                isChecked={isChecked}
                onPress={() => setIsChecked(!isChecked)}        
            />
        */}
            <Image source={imagem} style={estilos.imagem} />
            <Texto style={estilos.nome}>{nome}</Texto>
        </View>
        
    );
}

const estilos = StyleSheet.create({
    checkboxBase: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: 'green',
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: 'green',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    item: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ECECEC",
        paddingVertical: 16,
        marginHorizontal: 16,
        alignItems: "center",
    },
    imagem: {
        width: 46,
        height: 46,
    },
    nome: {
        fontSize: 16,
        lineHeight: 26,
        marginLeft: 11,
        color: "#464646",
    },
    checkboxLabel: {
        marginLeft: 8,
    }
});
