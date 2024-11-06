import React,{ useState, useEffect, useCallback} from 'react';
import { Image, FlatList, ScrollView, StyleSheet, TextInput, View, TouchableOpacity, Text, Animated } from 'react-native';
import Topo from './Componentes/Topo';
import Detalhes from './Componentes/Detalhes';
import Texto from '../../Components/Texto';
import mock from '../../mocks/marmita';
import ListaSuspensa from './Componentes/ListaSuspensa';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Marmita() {
    // Estado para armazenar os itens e o estado dos checkboxes
    const [itens, setItens] = useState([]);
    const [checkbox, setCheckbox] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);

    //Input dos valores dos Itens
    const [precoTamanho, setPrecoTamanho] = useState([]);
    const [inputValue, setInputValue] = useState([]);

    //Input nome da Marmita
    const [inputNomeMarmita, setInputNomeMarmita] = useState(null);

    //Limpar CheckBox
    const [checkboxLimpo, setCheckboxLimpo] = useState([]);

    //Pegar o Item Tamanho e Preço da Lista suspensa
    const [selectItem, setSelectedItem] = useState(null);

    const [mensagemSucesso, setMensagemSucesso] = useState('');

    //Uitlizando react memo para evitar renders desnecessários
    // const Topo = React.memo(function Topo(props) { /* Componente */ });
    // const Detalhes = React.memo(function Detalhes(props) { /* Componente */ });
    // const ListaSuspensa = React.memo(function ListaSuspensa(props) { /* Componente */ });




    // useEffect para buscar os dados do backend quando o componente monta
    useEffect(() => {
        const fetchItens = async () => {
            try {
                const response = await fetch('http://192.168.15.110:8000/itens/');
                const data = await response.json();
                setItens(prevItens => prevItens.length !== data.length ? data : prevItens);
                setCheckbox(prevCheckbox => prevCheckbox.length !== data.length ? new Array(data.length).fill(undefined) : prevCheckbox);
                setInputValue(prevInputValue => prevInputValue.length !== data.length ? new Array(data.length).fill(undefined) : prevInputValue);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        fetchItens();
    }, []); // Chama apenas uma vez para buscar os itens

    useEffect(() => {
        const fetchTamanhoPreco = async () => {
            try {
                const response = await fetch('http://192.168.15.110:8000/tamanhoPreco/');
                const data = await response.json();
                setPrecoTamanho(prevPrecoTamanho => prevPrecoTamanho.length !== data.length ? data : prevPrecoTamanho);
            } catch (error) {
                console.error("Erro ao buscar TamanhoPreco: ", error);
            }
        };
        fetchTamanhoPreco();
    }, []); // Chama apenas uma vez para buscar o preço e tamanho


    //Função para verificar se todos os campos estão preenchidos para apresentar o Botao de Salvar
    const validaCamposPreenchidos = () => {

        //Fução para verificar se o campo de texto está preenchido
        // const isButtonDisabled = inputNomeMarmita?.trim();
        const isButtonDisabled = inputNomeMarmita !== null ? true : false;
        //console.log(isButtonDisabled);

        // console.log(inputValue);
        // console.log(checkbox);

        //Verifica se o checkbox e o custo estão preenchidos        
        const indices = [];
        checkbox.forEach((check, index) => {
            if (check !== undefined) {
                indices.push(index);
            }
        });
        // Valida preenchimento do custo no checkbox
        const validaPreenchimento = indices.map((check) => inputValue[check] !== undefined ? true : false)

        // Verifica se o array está vazio
        const isArrayEmpty = validaPreenchimento.length === 0;
        let naotemFalso = false;
        if (isArrayEmpty) {

        }
        else {
            naotemFalso = !validaPreenchimento.includes(false);// Se for false algum item esta sem o custo
        }



        //Valida preenchimento do tamanho e preço        
       //console.log(selectItem)
        const tamPrecotemFalso = selectItem !== null && selectItem !== undefined ? true : false


        return isButtonDisabled && naotemFalso && tamPrecotemFalso;



    }

    const convertCurrencyArrayToDouble = (currencyArray) => {
        return currencyArray.map((currencyStr) => {
          // Remove "R$" e espaços
          let cleanedStr = currencyStr.replace("R$", "").trim();
      
          // Substitui o ponto por nada e a vírgula por ponto
          cleanedStr = cleanedStr.replace(".", "").replace(",", ".");
      
          // Converte para número
          return parseFloat(cleanedStr);
        });
      };

    const enviarDados = () => {
        const dataHoraAtual = new Date();

        //Limpa o checkBox dos Itens, excluindo os undefined
        const checkboxLimpo = checkbox.filter(item => item !== undefined);

        //Limpa o Array dos custos vazios
        const custosPreenchidos = inputValue.filter(custo => custo !== undefined);

        //   

        //console.log(JSON.stringify(parseFloat(selectItem.preco)))

        // Pega
        fetch('http://192.168.15.110:8000/marmita/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // nome: JSON.stringify(inputNomeMarmita),
                // itens: JSON.stringify(checkboxLimpo),
                // preco: JSON.stringify(parseFloat(selectItem.preco)),
                // tamanho: JSON.stringify(selectItem.tamanho),
                // data: JSON.stringify(dataHoraAtual),
                // custos: convertCurrencyArrayToDouble(custosPreenchidos),
                nome: inputNomeMarmita,
                itens: checkboxLimpo,
                preco: parseFloat(selectItem.preco),
                
                tamanho: selectItem.tamanho,
                data: dataHoraAtual,
                custos: convertCurrencyArrayToDouble(custosPreenchidos),


                
        
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response; // Se necessário, você pode manipular a resposta aqui
        })
        .then(data => {
            console.log("Dados enviados com sucesso:", data.status);
            if (data.status === 201) {
                setMensagemSucesso('Dados enviados com sucesso!'); // Define mensagem de sucesso
            }
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
        });
        
        
    }



    //Atualiza o Tamanho e o Preco no Pai
    const AtualizaTamanhoPreco = (item) => {

        setSelectedItem(item);

    };

    //Função para formatar o valor como moeda
    const formatarMoeda = (valor) => {
        const valorLimpo = valor.replace(/[^0-9]/g, '');
        const valorFormatado = (Number(valorLimpo) / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: "BRL",
        })
        return valorFormatado;
    }

    // Função para lidar com a mudança de texto e formatar o valor dentro do array
    const handleChangeText = useCallback((text, index) => {
        const valorFormatado = formatarMoeda(text);

        //Copia o array atual de valores
        const novosValores = [...inputValue];

        // Atualiza o valor no indice correto
        novosValores[index] = valorFormatado;

        // Define o novo array formatando no estado
        setInputValue(novosValores);



    }, [inputValue]);

    const handleSalvar = () => {
        // Lógica ao salvar os dados
        const dataHoraAtual = new Date();
        //Limpa o checkBox dos Itens, excluindo os undefined
        const checkboxLimpo = checkbox.filter(item => item !== undefined);

        //Limpa o Array dos custos vazios
        const custosPreenchidos = inputValue.filter(custo => custo !== undefined);
        console.log('Dados salvos:', JSON.stringify(inputNomeMarmita));
        console.log('Dados salvos:', JSON.stringify(parseFloat(selectItem.preco)));
        console.log('Dados salvos:', JSON.stringify(checkboxLimpo));
        console.log('Dados salvos:', convertCurrencyArrayToDouble(custosPreenchidos));
        console.log('Dados salvos:', JSON.stringify(selectItem.tamanho));
        console.log('Dados salvos:', JSON.stringify(dataHoraAtual));

    };

    const handleNomeMarmitaChange = useCallback((text) => {
        setInputNomeMarmita(text);
    }, []);


    return (
        <ScrollView>
            <FlatList
                // data={mock.itens.lista}
                nestedScrollEnabled
                data={itens}
                renderItem={({ item, index }) => (
                    <View>
                        <TouchableOpacity onPress={() => {
                            const updatedCheckbox = [...checkbox];
                            updatedCheckbox[index] = updatedCheckbox[index] ? undefined : item.item;
                            // console.log(updatedCheckbox);

                            // setStatuscheckbox(Math.random());
                            setCheckbox(updatedCheckbox);
                            // console.log(checkbox); 
                        }}>
                            <View style={estilos.item}>
                                {checkbox[index] === undefined
                                    ? <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="#2A9F85" />
                                    : <MaterialCommunityIcons name="checkbox-marked" size={24} color="#2A9F85" />}
                                {/* <Image source={item.imagem} style={estilos.imagem} /> */}
                                <Image source={{ uri: item.img }} style={estilos.imagem} />
                                <Texto style={estilos.nome}>{item.item}</Texto>
                            </View>
                        </TouchableOpacity>

                        {checkbox[index] && (

                            <TextInput
                                style={estilos.textInput}
                                placeholder='Informe o custo'
                                value={inputValue[index]}
                                onChangeText={(text) => handleChangeText(text, index)} // Atualiza o valor do input no estado
                                keyboardType='numeric' // Apenas números no teclado
                            />
                        )}
                    </View>
                )}
                // keyExtractor={({ nome }) => nome}
                // keyExtractor={(item, index) => index.toString()  }
                // ListFooterComponent={() => (
                //     <View style={estilos.footer}>
                //         <View style={estilos.formContainer}>
                //             <ListaSuspensa itens={precoTamanho} onSelectItem={AtualizaTamanhoPreco} />

                //         </View>


                //         {/* Nome da Marmita             */}
                //         <Texto style={estilos.formLabel}>Nome da Marmita</Texto>
                //         <TextInput
                //             style={estilos.textInput}
                //             placeholder='Digite o nome...'
                //             value={inputNomeMarmita}
                //             onChangeText={handleNomeMarmitaChange} // Atualiza o valor do input no estado
                //         />
                //         <TouchableOpacity style={[estilos.button, !validaCamposPreenchidos() && estilos.buttonDisabled]} 
                //             onPress={handleSalvar}
                //             disabled = {!validaCamposPreenchidos()}

                //             >
                //             <Texto style={estilos.buttonText}

                //             >Criar Marmita</Texto>
                //         </TouchableOpacity>
                //     </View>
                // )}
                ListHeaderComponent={() => (
                    <View>
                        <Topo {...mock.topo} />
                        <View style={estilos.lista}>
                            <Detalhes {...mock.detalhes} />
                            <Texto style={estilos.titulo}>{mock.itens.titulo}</Texto>
                        </View>
                    </View>
                )}
            />

            <View style={estilos.footer}>
                <View style={estilos.formContainer}>
                    <ListaSuspensa itens={precoTamanho} onSelectItem={AtualizaTamanhoPreco} />

                </View>


                {/* Nome da Marmita             */}
                <Texto style={estilos.formLabel}>Nome da Marmita</Texto>
                <TextInput
                    style={estilos.textInput}
                    placeholder='Digite o nome...'
                    value={inputNomeMarmita}
                    onChangeText={handleNomeMarmitaChange} // Atualiza o valor do input no estado
                />
                <TouchableOpacity style={[estilos.button, !validaCamposPreenchidos() && estilos.buttonDisabled]}
                    onPress={enviarDados}
                    //onPress={handleSalvar}
                    disabled={!validaCamposPreenchidos()}

                >
                    
                    <Texto style={estilos.buttonText}

                    >Criar Marmita</Texto>
                </TouchableOpacity>

                {/* {mensagemSucesso ? (
                <Animated.View style={[estilos.animatedContainer, { transform: [{ scale: escalaAnimada }] }]}>
                    <Text style={estilos.sucesso}>{mensagemSucesso}</Text>
                </Animated.View>
            ) : null} */}

            </View>

        </ScrollView>



    );
}

const estilos = StyleSheet.create({
    font1: {
        alignItems: "center",
        paddingRight: 5,
        backgroundColor: "#00fa9a",
    },
    animatedContainer: {
        marginTop: 20,
    },
    sucesso: {
        color: 'green',
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',  // Cor diferente para o botão desativado
    },
    formLabel: {
        fontSize: 18,
        marginBottom: 5,
        color: "#808000",
        fontWeight: 'bold',
    },
    lista: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    item: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ECECEC",
        paddingVertical: 12,
        marginHorizontal: 16,
        alignItems: "center",
    },
    imagem: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    nome: {
        fontSize: 16,
        marginLeft: 10,
        color: "#333",
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        paddingVertical: 5,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#2A9F85',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: '#2A9F85',
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    disabledLabel: {
        color: '#bbb',
    },
    footer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#f9f9f9',
    },
    formContainer: {
        marginBottom: 10,
        flexDirection: "row",
    },

    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 5,
        marginBottom: 16,
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#2A9F85',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 16,
    },
});
