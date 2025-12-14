import { StyleSheet, Text, View } from "react-native"
export const FlowFooter = () =>{
    return(
        <View style={styles.footer}>
          <Text style={styles.footerText}>
           Aplicativo Flow para Gestão do Tempo
          </Text>
          <Text style={styles.footerText}>
             Desenvolvido por SenaiTech
          </Text>
      </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        width: '80%',
        paddingVertical: 25,
      },
      footerText: {
        textAlign: 'center',
        color: '#98A0A8',
        fontSize: 12.5
      },
})