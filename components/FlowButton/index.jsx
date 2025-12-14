import { Pressable, StyleSheet, Text } from "react-native"
export const FlowButton = ({ onPress }) =>{
    return (
    <Pressable 
        style={styles.button} 
        onPress={onPress}
    >
        <Text style={styles.buttonText}>
            Start
        </Text>
    </Pressable>
    );
};

const styles = StyleSheet.create({
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
});