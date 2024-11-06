// import 'react-native-reanimated';
import { CartesianChart, Bar, VictoryChart, VictoryBar, VictoryTheme } from "victory-native";
import React, { useState, useEffect } from "react";


import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function Dashboard() {

  const [marmitas, setMarmitas] = useState([]);
  const [vendas, setVendas] = useState([]);

  //Busca as vendas realizadas
  useEffect(() => {
    const fetchTamanhoPreco = async () => {
      try {
        const response = await fetch('http://192.168.15.110:8000/vendas/');
        const data = await response.json();
        // Extrair apenas os custos e itens


        //console.log(data);
        setVendas(data);
      } catch (error) {
        console.error("Erro ao buscar Marmita: ", error);
      }
    };
    fetchTamanhoPreco();
  }, []);


  // Busca as marmitas criadas
  useEffect(() => {
    const fetchTamanhoPreco = async () => {
      try {
        const response = await fetch('http://192.168.15.110:8000/marmita/');
        const data = await response.json();
        const resultado = data.map(item => ({
          custos: item.custos,
          itens: item.itens
        }));

        // Passo 1: Criar um array com itens e seus respectivos custos
        const itemCustoArray = resultado.flatMap(({ custos, itens }) => {
          return itens.map((item, index) => ({
            item,
            custo: custos[index] || 0 // Para garantir que não haja erro se os arrays não tiverem o mesmo comprimento
          }));
        });

        // Passo 2: Somar os custos de itens repetidos
        const custoSomado = itemCustoArray.reduce((acc, { item, custo }) => {
          if (!acc[item]) {
            acc[item] = 0; // Inicializa o custo se o item não existir
          }
          acc[item] += custo; // Soma o custo
          return acc;
        }, {});

        // Passo 3: Converter o objeto de volta em um array
        const resultados = Object.entries(custoSomado).map(([item, custo]) => ({
          item,
          custo
        }));
        console.log(resultados);
        setMarmitas(resultados);
      } catch (error) {
        console.error("Erro ao buscar Marmita: ", error);
      }
    };
    fetchTamanhoPreco();
  }, []);

  const chartData = {
    labels: marmitas.map(item => item.item),    // Extrai os nomes dos itens
    datasets: [
        {
            data: marmitas.map(item => item.custo)  // Extrai os custos
        }
    ]
};

const screenWidth = Dimensions.get("window").width;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Gráfico de Custos dos Itens</Text>
        <BarChart
            data={chartData}
            width={screenWidth - 30} // Ajuste da largura do gráfico
            height={240}
            fromZero={true}
            chartConfig={{
                backgroundColor: "#1cc910",
                backgroundGradientFrom: "#eff3ff",
                backgroundGradientTo: "#efefef",
                decimalPlaces: 0, // Remover decimais
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
            }}
            verticalLabelRotation={30}
        />
    </View>
);
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text style={{ fontSize: 24, marginBottom: 20 }}>Gráfico de Custos dos Itens</Text>
//         <VictoryChart>
//             <VictoryBar
//                 data={marmitas}
//                 x="item"
//                 y="custo"
//                 style={{
//                     data: { fill: "tomato", width: 20 },
//                     labels: { fontSize: 12 }
//                 }}
//             />
//         </VictoryChart>
//     </View>
// );


  // return (

  //   <CartesianChart data={marmitas} xKey="item" yKeys={["custo"]}>

  //     {({ points, chartBounds }) => (
  //       //👇 pass a PointsArray to the Bar component, as well as options.
  //       <Bar
  //         points={points}
  //         chartBounds={chartBounds}
  //         color="red"
  //         roundedCorners={{ topLeft: 10, topRight: 10 }}
  //       />
  //     )}
  //   </CartesianChart>

  // );
}