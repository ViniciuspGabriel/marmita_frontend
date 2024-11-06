import React from "react";

import {Image, StyleSheet,Dimensions} from 'react-native';
import Marmita_photo from '../../../../assets/marmita_photo.png';
import Texto from '../../../Components/Texto';

const width = Dimensions.get('screen').width;

export default function Topo({titulo}){
    return <>
    <Image source={Marmita_photo} style={estilos.Marmita_photo}/>
    {/*<Texto style={estilos.titulo}>{ titulo } </Texto>*/}
    </>

}

const estilos = StyleSheet.create({
    Marmita_photo: {
        width: "100%",
        height: 510 / 510 * width,
    },
    titulo: {
        width: "100%",
        position: "absolute",
        textAlign: "center",
        fontSize: 20,
        lineHeight: 150,
        color: "white",
        fontWeight: "bold",
        padding: 16,
    },

})