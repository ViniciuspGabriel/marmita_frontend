
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import Tabela from './Componentes/Dashboard'

import React, { useState, useEffect, useCallback } from 'react';
import Texto from '../../Components/Texto';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import { Calendar } from 'react-native-calendars';

import {
    useFonts,
    Poppins_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium
} from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading';
import { AntDesign } from '@expo/vector-icons';


export default function Dashboard() {

    const [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_500Medium,
    });


    if (!fontsLoaded) {
        <AppLoading />;
    }


    const [visible, setVisible] = useState(false); // Estado para controlar a visibilidade do modal
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateSelect = (date) => {
        setSelectedDate(date.dateString); // Armazena a data selecionada
        setVisible(false); // Fecha o calendário após a seleção
    };

    
    const [marmitas, setMarmitas] = useState([]);

    useEffect(() => {
        const fetchMarmitas = async () => {
            try {
                const response = await fetch('http://192.168.15.110:8000/marmita/');
                const data = await response.json();

                setMarmitas(data);
                //setPrecoTamanho(prevPrecoTamanho => prevPrecoTamanho.length !== data.length ? data : prevPrecoTamanho);
            } catch (error) {
                console.error("Erro ao buscar Marmita: ", error);
            }
        };
        fetchMarmitas();
    }, []); // Chama apenas uma vez para buscar o preço e tamanho

    // Função de callback que será passada para o componente Tabela
    const handleMarmitaChange = (updatedMarmita) => {
        // Lógica para tratar mudanças nas marmitas
        console.log("Marmita atualizada:", updatedMarmita);

        // Atualizar a lista de marmitas com a nova informação
        setMarmitas((prevMarmitas) =>
            prevMarmitas.map(marmita =>
                marmita.id === updatedMarmita.id ? updatedMarmita : marmita
            )
        );
    };


    return (
        <View style={estilos.principal}>

            {/* Área chamativa do usuário */}
            <View style={estilos.chamadaUsuario}>


                <View >
                    <View style={estilos.chamada}>
                        <Text style={estilos.chamadaNome}>OLÁ GILSELENE! </Text>
                        <Entypo name="hand" size={24} color="orange" />
                    </View>
                    <View>
                        <Text style={estilos.chamadaAcompanhar}>Vamos acompanhar suas Vendas</Text>
                    </View>
                </View>

                {/* Usuário pode selecionar venda ou Custo */}
                <View style={estilos.vendaCusto}>
                    <MaterialCommunityIcons name="toggle-switch-off-outline" size={45} color="black" />
                </View>
            </View>

            {/* Área de receita e número de vendas por dia */}
            <View style={estilos.receitaCusto}>
                {/* Receita */}
                <View style={estilos.receita}>
                    <View style={estilos.receitaIcon}>
                        <AntDesign name="dashboard" size={20} color="white" />
                    </View>
                    <View style={estilos.receitaValor}>
                        <Text style={estilos.receitaValor1}>53,00</Text>
                        <Text style={estilos.chamadaAcompanhar}>Receita</Text>
                    </View>

                </View>

                {/* Vendas por dia */}
                <View style={estilos.custo}>
                    <View style={estilos.receitaIcon}>
                        <AntDesign name="dashboard" size={20} color="white" />
                    </View>

                    <View style={estilos.receitaValor}>
                        <Text style={estilos.receitaValor1}>250</Text>
                        <Text style={estilos.chamadaAcompanhar}> Qtdº Vendidas</Text>
                    </View>
                </View>

            </View>

            {/* Área para ajustar o calendário/ Tela vai ser responsiva através da entreda da data */}

            <View>

                <Button title="Escolher Data" onPress={() => setVisible(true)} /> {/* Botão para abrir o calendário */}


                <Modal visible={visible} transparent={true} animationType="slide"> {/* Modal para o calendário */}
                    <View style={estilos.modalContainer}>
                        <Calendar
                            onDayPress={handleDateSelect} // Manipulador de seleção de data
                            markedDates={{ [selectedDate]: { selected: true, marked: true } }} // Marca a data selecionada
                        />
                        <Button title="Fechar" onPress={() => setVisible(false)} /> {/* Botão para fechar o modal */}
                    </View>
                </Modal>

            </View>

            {/* Área de receita e número de vendas da semana| */}
            <View></View>

            {/* Aréa do gráfico */}
            <View>
                {/* Passar a função de callback como prop */}
                <Tabela marmita={marmitas} onMarmitaChange={handleMarmitaChange} />
            </View>



        </View>
    )


}

const estilos = StyleSheet.create({
    chamadaNome: {
        fontFamily: 'Poppins_600SemiBold', // Fonte Poppins SemiBold
        fontSize: 24,
    },
    chamadaAcompanhar: {
        fontFamily: 'Poppins_400Regular',
        opacity: 0.8, // deixa o texto 70% opaco
        fontSize: 12,
        color: "white",
    },
    chamada: {
        flexDirection: "row",
    },
    chamadaUsuario: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,


    },
    principal: {
        backgroundColor: "#FFFFFF",

    },
    vendaCusto: {
        // backgroundColor: "#00ffff",

    },
    receitaCusto: {
        // backgroundColor: "#00ffff",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,

    },
    receita: {
        backgroundColor: "#ffc727",
        width: 160,
        height: 90,
        borderWidth: 2,         // Largura da borda
        borderColor: '#FFF',     // Cor da borda
        borderRadius: 10,        // Raio de borda para cantos arredondados (opcional)

    },
    receitaIcon: {
        alignItems: "flex-end",
    },
    receitaValor: {
        alignItems: "center",
        padding: 2,
        justifyContent: "space-around",


    },
    receitaValor1: {
        color: 'white',
        paddingTop: 10,
        fontSize: 20,
        paddingBottom: 5,
        fontFamily: 'Poppins_500Medium',
    },

    custo: {
        backgroundColor: "#10B981",
        width: 160,
        height: 90,
        borderWidth: 2,         // Largura da borda
        borderColor: '#FFF',     // Cor da borda
        borderRadius: 10,        // Raio de borda para cantos arredondados (opcional)


    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
    },


});