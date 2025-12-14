import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { pomodoro } from "../components/Pomodoro";
import { FlowButton } from "../components/FlowButton";
import { ActionButton } from "../components/ActionButton";
import { FlowFooter } from "../components/FlowFooter";
import { Timer } from "../components/Timer";
import { usePomodoroLogic } from "../hooks/usePomodoroLogic";

export default function Index() {
  const [timerType,setTimerType] = useState(pomodoro[0])
  const {timeLeft, currentTime, startTimer, pauseTimer, resetTimer} = usePomodoroLogic(timerType.initialValue);
  const handleChangeTimer = (type) => {
    resetTimer(type.initialValue);
    setTimerType(type);
  }
  return (
    <View style={styles.container}>
      <Image source={timerType.image} />
      <View style={styles.actions}>
      <View style={styles.context}>
             {pomodoro.map(p =>(
                  // componente actionButton
                  <ActionButton
                    key={p.id}
                    active={ timerType.id === p.id }
                    onPress={() => handleChangeTimer(p)}
                    display={p.display}/>
                  ))}
        </View >
        <Timer totalSeconds = {timeLeft}/>
         {/* componente botão */}
         <FlowButton 
            onPress = {() => {
              currentTime ? pauseTimer() : startTimer();
            }}
          />
      </View>
        {/* footer vem aqui */}
        <FlowFooter/>
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
     context:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
     },
});
