import { useState } from "react";
import {Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {

  const [timerType,setTimerType] = useState(pomodoro[0])
  return (
    <View style={styles.container}>
      <Image source={timerType.image} />
      <View style={styles.actions}>
        <View style={styles.context}>
          {
            pomodoro.map(
              p => (
            <Pressable key={p.id}>
              <Text style={styles.contextButtonText}>
                {p.display}
              </Text>
            </Pressable>))
          }
          
        </View>
         <Text style={styles.timer}>
              {new Date(timerType.initialValue * 60000).toLocaleTimeString('pt-BR',{minute:'2-digit',second:'2-digit'})}
         </Text> 
         <Pressable style={styles.button} >
            <Text style={styles.buttonText}>
               Começar
            </Text>
         </Pressable>       
      </View>
      <View style={styles.footer}>
          <Text style={styles.footerText}>
           Aplicativo Flow para Gestão do Tempo
          </Text>
          <Text style={styles.footerText}>
             Desenvolvido por SenaTech
          </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
     
     container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'#021123',
      
     },
     actions: {
        
        paddingVertical: 24,
        paddingHorizontal: 24,
        backgroundColor: '#14448080',
        width: "80%",
        borderRadius: 32,
        borderWidth: 2,
        borderColor: '#144480',   
        gap: 40,      
     },
     timer: {
        fontSize: 54,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
     },
     buttonText: {
         textAlign: 'center',
         color: '#021123',
         fontSize: 18
     },
     button: {
         backgroundColor: "#B872FF",
         borderRadius: 32,
         padding: 10,
         
     }, 
     footer: {
       width: '80%',
       borderWidth: 2,
       paddingVertical: 25,
     },
     footerText: {
       textAlign: 'center',
       color: '#98A0A8',
       fontSize: 12.5
     },
     context:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
     },
     contextButtonText:{
      fontSize:12.5,
      color: '#FFFF',
      padding: 8,
     },
     contextButtonActive:{
      backgroundColor: '#144480',
      borderRadius: 12,
     }
});
const pomodoro = [
  {
    id: 'focus',
    initialValue:25,
    image:require('./pomodoro.png'),
    display: 'Foco'
  },
  {
    id: 'short',
    initialValue:5,
    image:require('./short.png'),
    display: 'Pausa curta'
  },
  {
    id: 'long',
    initialValue:15,
    image:require('./long.png'),
    display: 'Pausa longa'
  }
]

//export default app;
