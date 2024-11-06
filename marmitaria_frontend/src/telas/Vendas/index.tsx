import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Input } from "react-native-elements";
import { center } from "@shopify/react-native-skia";


export default function Vendas() {

  const [inputValue, setInputValue] = useState("");
  const [marmitas, setMarmitas] = useState([]);

  useEffect(() => {
    const fetchTamanhoPreco = async () => {
      try {
        const response = await fetch('http://192.168.15.110:8000/marmita/');
        const data = await response.json();
        setMarmitas(data);
      } catch (error) {
        console.error("Erro ao buscar Marmita: ", error);
      }
    };
    fetchTamanhoPreco();
  }, []);

 

    const conta = marmitas.length;
    const [precoporMarmita, setPrecoporMarmita] = useState(() => Array(conta || 1).fill(0));
    useEffect(() => {
      setPrecoporMarmita(Array(conta).fill(0));
    }, [conta]);

    const [counts, setCounts] = useState(() => Array(conta || 1).fill(0));
    useEffect(() => {
      setCounts(Array(conta).fill(0));
    }, [conta]);

    const incrementCounta = (index, valor, quantidade) => {
      const newCounts = [...counts];
      newCounts[index] += 1;
      setCounts(newCounts);

      const newPreco = totalporMarmita(Number(valor), newCounts[index]);
      const precoFinal = [...precoporMarmita];
      precoFinal[index] = newPreco;
      setPrecoporMarmita(precoFinal);
    };

    const decrementCounta = (index, valor, quantidade) => {
      if (counts[index] !== 0) {
        const newCounts = [...counts];
        newCounts[index] -= 1;
        setCounts(newCounts);

        const newPreco = totalporMarmita(Number(valor), newCounts[index]);
        const precoFinal = [...precoporMarmita];
        precoFinal[index] = newPreco;
        setPrecoporMarmita(precoFinal);
      }
    };

    const formatarMoeda = (numero) => {
      numero = parseFloat(numero);
      const formatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(numero);
      return formatado;
    };

    const totalporMarmita = (preco, quantidade) => preco * quantidade;

    const calcularTotalGeral = () => {
      const total = precoporMarmita.reduce((acc, curr) => acc + curr, 0);
      return total;
    };

    // Função para validar se os campos estão preenchidos
    const validaCamposPreenchidos = () => {

      //Valida se o Input para cliente é vazio, se estiver vazio, vai voltar false
      const ValidaCliente = inputValue !== '' ? true : false

      const precoTotal = calcularTotalGeral();

      const ValidaprecoTotal = precoTotal > 0 ? true : false

      return ValidaCliente && ValidaprecoTotal;


    }

    // Função para preencher a quantidade e a marmita comprada
    const marmitasDiferenteDeZero = () => {
      const marmitasCompradas = counts.map((valor, indice) => (valor !== 0 ? indice : null))
      .filter(indice => indice !== null);

      const marmitasId = marmitasCompradas.map(marmitasCompradas => marmitas[marmitasCompradas])
      const ids = marmitasId.map(item => item._id);
      //console.log(ids)
      
      
      return ids;

    };

    const quantidadeMarmita =() =>{
      return counts.map((valor, indice) =>(valor !== 0 ? valor :null))
      .filter (valor => valor !== null);
    }

    const enviarDados = () => {

      const idsmarmitasCompradas = marmitasDiferenteDeZero();
      const quant = quantidadeMarmita();
      
      console.log(inputValue);
      console.log(idsmarmitasCompradas);
      console.log(quant);



      // Enviar Dados
      fetch('http://192.168.15.110:8000/vendas/', {


        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          cliente: inputValue,
          quantidade: quant, //Array
          marmitas: idsmarmitasCompradas, //Array 
          


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
            console.log('Dados enviados com sucesso!'); // Define mensagem de sucesso
          }
        })
        .catch(error => {
          console.error('Erro ao enviar dados:', error);
        });
    }

  

  return (
    <KeyboardAvoidingView
      style={estilos.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={estilos.inner}>
        <View style={estilos.listContainer}>
          <FlatList
            data={marmitas}
            renderItem={({ item, index }) => (
              <View style={estilos.container_plus_minus}>
                <TouchableOpacity style={estilos.botaoLeft} onPress={() => decrementCounta(index, item.preco, counts[index])}>
                  <AntDesign name="minuscircleo" size={24} color="black" />
                </TouchableOpacity>

                <View style={estilos.container_descricao}>
                  <View style={estilos.cont_descr_iitem}>
                    <View>
                      <Text>{item.nome}</Text>
                    </View>
                    <View>
                      <Text>{item.itens}</Text>
                    </View>
                  </View>

                  <View style={estilos.cont_quant_unit_total}>
                    <View>
                      <Text style={estilos.count_label}>{counts[index]}</Text>
                    </View>
                    <View>
                      <Text style={estilos.count_label}>{item.preco}</Text>
                    </View>
                    <View>
                      <Text style={estilos.count_label}>
                        {formatarMoeda(precoporMarmita[index])}
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity style={estilos.botaoRight} onPress={() => incrementCounta(index, item.preco, counts[index])}>
                  <AntDesign name="pluscircleo" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Parte Fixa (Cliente e Total) */}
        <View style={estilos.footer}>
          <View style={estilos.inner_footer}>
            <View style={estilos.inner_cliente}>
              <Text style={estilos.inner_cliente1}>CLIENTE</Text>
              <Input
                style={estilos.entrada}
                placeholder="Digite o nome do Cliente"
                placeholderTextColor="#888"
                onChangeText={setInputValue}
                value={inputValue}
              />
            </View>

            <View style={estilos.inner_total}>
              <Text style={estilos.inner_tot}>TOTAL</Text>
              <Text style={estilos.inner_tot}>{formatarMoeda(calcularTotalGeral())}</Text>
            </View>
          </View>
          <TouchableOpacity style={[estilos.botao, !validaCamposPreenchidos() && estilos.buttonDisabled]}
            disabled={!validaCamposPreenchidos()}
            onPress={enviarDados}
          >
            <Text style={estilos.texto_botao}>CONFIRMAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  buttonDisabled: {
    backgroundColor: '#cccccc',  // Cor diferente para o botão desativado
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  inner: {
    flex: 1,

  },
  inner_footer: {
    flex: 1,
    backgroundColor: "#F0F0F0", // Cinza claro para o fundo
    flexDirection: "row",
  },
  listContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  container_plus_minus: {
    backgroundColor: "#F7F7F7",
    flexDirection: "row",
    justifyContent: "center",
  },
  botao: {
    marginTop: 2,
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  texto_botao: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',
  },
  footer: {
    padding: 10,
    height: 200,
    backgroundColor: "#F0F0F0",
  },
  inner_cliente: {
    marginBottom: 10,
    height: 90,
    flex: 1,
    backgroundColor: "#E0E0E0", // Cinza suave para a área de cliente
  },
  inner_cliente1: {
    fontWeight: "bold",
    fontSize: 16,

    paddingVertical: 5,
    // paddingLeft: 15,
    marginBottom: 5,

    textAlign: 'center',
    color: "#333", // Cor escura para o texto do cliente
  },
  inner_total: {
    paddingVertical: 10,
    backgroundColor: "#3F51B5",
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    flex: 0.3,
    height: 90,
    // paddingVertical: 30,
    paddingLeft: 10,

  },
  inner_tot: {
    color: "#FFF",
    fontSize: 18,
    paddingVertical: 5,
    textAlign: 'center',
    paddingLeft: 12,
  },
  container_descricao: {
    width: 200,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#FFF",
    marginHorizontal: 5,
  },
  cont_descr_iitem: {
    marginBottom: 5,
  },
  count_label: {
    fontSize: 18,
  },
  botaoLeft: {
    justifyContent: "center",
    marginRight: 10,
  },
  botaoRight: {
    justifyContent: "center",
    marginLeft: 10,
  },
  entrada: {
    height: 50,
    width: "100%",
    borderColor: "#CCCCCC", // Cinza claro para a borda do input
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: "#FFFFFF", // Fundo branco para o input
    color: "#333", // Texto escuro
  },
  cont_quant_unit_total: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },


});
