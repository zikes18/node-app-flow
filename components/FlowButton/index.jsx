import { Pressable, StyleSheet, Text } from "react-native"
export const FlowButton = ({ onPress, text, isRunning, style }) =>{
    const label = text ? text : (isRunning ? "Pause" : "Start");
    return (
    <Pressable 
        style={[styles.button, style]} 
        onPress={onPress}
    >
        <Text style={styles.buttonText}>
            {label}
        </Text>
    </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        textAlign: 'center',
        color: '#021123',
        fontSize: 18,
        fontWeight: 'bold', 
    },
    button: {
        backgroundColor: "#B872FF",
        borderRadius: 32,
        padding: 10,
        alignItems: 'center'
    }, 
});