import logo from '../../assets/logo.png';
import salada from '../../assets/itens/salad.png';
import arroz from '../../assets/itens/rice.png';
import feijao from '../../assets/itens/beans.png';
import bisteca_suina from '../../assets/itens/pork_chop.png';
import file_frango from '../../assets/itens/chicken_fillet.png';
import french_fries from '../../assets/itens/french_fries.png';
import Itens from '../telas/Marmita/Componentes/Itens';

const marmita ={
    topo:{
        titulo: "INFORME O CARDAPIO DO DIA ",
    },
    detalhes:{
        logo_estab: logo,
        nome: "CARDÁPIO DA CASA DA MARMITA",
        nome_desc: "Necessário informar os itens da marmita",
        valor: "Monte o Cardápio e informe o seu custo:",
        comprar: "Comprar",
    },
    tamanho:{
      titulo: "Tamanho da Marmita"  ,
      lista:[
        {
          nome: "P",
        },
        {
          nome: "M",
        },
        {
          nome: "G",
        }
      ]

    },

    marmita_cadastro:{
      titulo: "Marmitas cadastradas",
      lista:[
        {
          nome: "Bisteca",
          itens: "Salada, Feijão, Bisteca",
          tamanho: "P",
          valor: "20.00"

        },
        {
          nome: "File de Frango",
          itens: "Salada, Abobora, Frango",
          tamanho: "M",
          valor: "24.00"

        },
        {
          nome: "Carne de panela",
          itens: "Batata Frita, Abobora, Frango",
          tamanho: "G",
          valor: "28.00"

        },
      ]
    },

    itens: {
        titulo: "Itens da marmita",
        lista: [
          {
            nome: "Salada",
            imagem: salada,
          },
          {
            nome: "Arroz",
            imagem: arroz,
          },
          {
            nome: "Feijão",
            imagem: feijao,
          },
          { 
            nome: "Bisteca suina",
            imagem: bisteca_suina,
          },
          {
            nome: "File de frango",
            imagem: file_frango,
          },
          {
            nome: "Batatas Fritas",
            imagem: french_fries,
          }
        ]
      }
}

export default marmita;