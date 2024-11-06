import React from "react";
import Middle from "./Componentes/Medio";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import mock_menu from "../../mocks/menu"




export default function Menu() {
    return <SafeAreaView>
        <StatusBar/>
        <Middle {...mock_menu.meio}  />
    </SafeAreaView>
}

