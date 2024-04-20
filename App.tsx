import React from "react";
import { StyleSheet, SafeAreaView } from 'react-native';
import Weather from "./Weather";
const App =()=>{
  return(
    <SafeAreaView style={styles.container}>
      <Weather />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
})
export default App;