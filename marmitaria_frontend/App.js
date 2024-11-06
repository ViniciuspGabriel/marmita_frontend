
import { StatusBar,SafeAreaView, View } from 'react-native';
import Marmita from './src/telas/Marmita';
import Menu from './src/telas/Menu';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json'; // Certifique-se de que o nome no app.json é "main"
import Dashboard from './src/telas/Dashboard';
import Vendas from './src/telas/Vendas';
import mock_menu from './src/mocks/menu';
import mock from './src/mocks/marmita';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

  const MyStack = () => {
    
    return (
      
        <Stack.Navigator>
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{title: 'Menu'}}
          />
          <Stack.Screen name="Vendas" component={Vendas} />
          <Stack.Screen name="Marmita" component={Marmita} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          {/* <Stack.Screen name="Dashboard" component="Dashboard" /> */}
        </Stack.Navigator>
      
    );
  };

  export default function App(){

    const [fonteCarregada] = useFonts({
      "MontserratRegular": Montserrat_400Regular,
      "MontserratBold": Montserrat_700Bold,
    });
    
    if (!fonteCarregada){
      return <View/>
    }
  
  
    return(
      
      <NavigationContainer>
        <SafeAreaView style={{flex:1}}>
        <MyStack/>
        </SafeAreaView>
      </NavigationContainer>
      
    )


  }


