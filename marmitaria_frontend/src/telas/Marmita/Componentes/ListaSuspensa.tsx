import { View, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import Texto from '../../../Components/Texto';

const ListaSuspensa = (props) => {
    const [selectedValue, setSelectedValue] = useState("");

    const formatarMoeda = (valor) => {
        const valorFormatado = (Number(valor)).toLocaleString('pt-BR', {
            style: 'currency',
            currency: "BRL",
        });
        return valorFormatado;
    }

    // Encontre o item selecionado para mostrar o preço
    const selectedItem = props.itens.find(item => item.tamanho === selectedValue);

    // Use useEffect para chamar o callback quando selectedItem mudar
    useEffect(() => {
        console.log(selectedItem)
        //console.log(selectedValue)
        // if(selectedItem){
        //     props.onSelectItem(selectedItem); // Chamar a função do componente pai
            
        // }
        props.onSelectItem(selectedItem); // Chamar a função do componente pai
    }, [selectedItem]);

    return (
        <View style={styles.formContainer}>
            <View style={styles.containerTamanho}>
                <View style={styles.labelContainer}>
                    <Texto style={styles.formLabel}>Tamanho</Texto>
                </View>

                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => {
                        if(itemValue === "null"){
                            setSelectedValue("Vazio"); // Define o valor vazio quando "Selecionar item" for escolhido
                        }else{
                            setSelectedValue(itemValue)} // Define o valor selecionado
                        }
                    }
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    
                >
                    {/* Primeiro item padrão para seleção */}
                    <Picker.Item label="Selecionar item" value= 'null' />

                    

                    {props.itens.map(item => (
                        <Picker.Item key={item.tamanho} label={item.tamanho} value={item.tamanho} />
                    ))}
                    
                </Picker>

            </View>

            <View style={styles.containerPreco}>
                <View style={styles.labelContainer2}>
                    <Texto style={styles.formLabel}>Preço</Texto>
                    
                </View>
                <Text 
                style={[
                    styles.preco,
                    selectedItem ? styles.selectedItem : styles.unselectedItem

                ]}
                
                >
                    
                    {selectedItem ? formatarMoeda(selectedItem.preco) : 'Selecione um Item'}
                    
                    
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formLabel: {
        fontSize: 18,
        alignItems: 'center',
        color: '#808000',
        // backgroundColor: "#ffe4b5",
        fontWeight: 'bold',
    },
    labelContainer: {
        alignItems: 'center',
        marginBottom: 2,
    },
    labelContainer2: {
        alignItems: 'center',
        marginBottom: 22,
        
    },
    formContainer: {
        flex: 1,
        marginBottom: 10,
        marginTop: 10,
        flexDirection: "row",
        // backgroundColor: "#ffa500",
        height: 100,

    },
    containerTamanho: {
        marginTop: 30,
        borderColor: '#808000',
        borderWidth: 1,
        borderRadius: 8,
        width: 220,
        height: 60,
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        shadowColor: "#808000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5, // Sombras no Android
        marginLeft: 10,
        padding: 10, // Adicionado para dar espaçamento interno
    },
    pickerWrapper: {
        flex: 1, // Para preencher o espaço do containerTamanho
        justifyContent: 'center',
    },
    containerPreco: {

        marginTop: 30,
        borderColor: '#808000',
        borderWidth: 1,
        borderRadius: 8,
        height: 60,
        width: 110,

        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        shadowColor: "#808000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5, // Sombras no Android
        marginLeft: 10,
    },
    picker: {
       
        //color: "#808000",
        fontSize: 16,
        paddingBottom: 20,
    },
    pickerItem: {
        height: 60,
        fontSize: 16,
        color: "#808000",
        fontWeight: 'bold',
    },
    preco: {
        height: 60,
        

        fontSize: 16,
        color: "#808000",
        paddingLeft: 20,
    },
    selectedItem:{
        paddingTop: 3,
    },
    unselectedItem:{
        paddingBottom: 2,
        fontSize: 11,
        paddingLeft: 5,
        color: "#ff4500",
        fontWeight: 'bold'
    }
});

export default ListaSuspensa;
