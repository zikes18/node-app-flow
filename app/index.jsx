import { useState, useEffect } from "react";
// Adicionei Pressable aqui nos imports
import { Image, StyleSheet, Text, View, Modal, TextInput, Alert, Pressable } from "react-native";
import { pomodoro } from "../components/Pomodoro";
import { FlowButton } from "../components/FlowButton";
import { ActionButton } from "../components/ActionButton";
import { FlowFooter } from "../components/FlowFooter";
import { Timer } from "../components/Timer";
import { usePomodoroLogic } from "../hooks/usePomodoroLogic";

import { api } from "../services/api";

export default function Index() {
  const [timerType, setTimerType] = useState(pomodoro[0]);
  const [apiStatus, setApiStatus] = useState("Conectando ...");
  
  // --- ESTADOS DO MODAL ---
  const [modalVisible, setModalVisible] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");

  const { timeLeft, currentTime, startTimer, pauseTimer, resetTimer } = usePomodoroLogic(timerType.initialValue);

  // Lógica de pausa ajustada: Pausado se não estiver rodando, tempo correu e não acabou
  const isRunning = !!currentTime;
  const isPaused = !isRunning && timeLeft < timerType.initialValue && timeLeft > 0;

  // --- 1. MONITORAR SE O TEMPO ACABOU ---
  useEffect(() => {
    if (timeLeft === 0) {
      if (isRunning) pauseTimer(); // Garante que parou
      setModalVisible(true); // Abre o modal para salvar
    }
  }, [timeLeft]);

  // --- 2. TESTE DE CONEXÃO (Seu código original) ---
  useEffect(() => {
    async function loadTest() {
      try {
        const response = await api.get("/hello");
        setApiStatus(response.data.message); 
        console.log("Sucesso:", response.data);
      } catch (error) {
        console.error("Erro API:", error);
        setApiStatus("Falha na conexão"); 
      }
    }
    loadTest();
  }, []);

  const handleChangeTimer = (type) => {
    resetTimer(type.initialValue);
    setTimerType(type);
  };

  // --- 3. REINÍCIO MANUAL (Botão 🔁) ---
  const handleManualReset = () => {
    pauseTimer(); // Para o tempo
    setModalVisible(true); // Pergunta o que foi feito antes de resetar
  };

  // --- 4. CANCELAR / PULAR ---
  const handleCancel = () => {
    setModalVisible(false);
    setTaskDescription("");
    resetTimer(timerType.initialValue);
  };

  // --- 5. SALVAR TAREFA (POST NA API) ---
  async function handleSaveTask() {
    if (taskDescription.trim() === "") {
      Alert.alert("Atenção", "Por favor, descreva a tarefa.");
      return;
    }

    try {
      // Montando o objeto exatamente como pediu
      const payload = {
        descricao: taskDescription,        // String
        dataTarefa: new Date().toISOString(), // String (Data atual em ISO)
        tempoPomodoro: timerType.initialValue, // int (Total em segundos do timer selecionado)
        tipo: timerType.id                 // int (ID do tipo: 1, 2 ou 3)
      };

      console.log("Enviando payload:", payload);

      await api.post("/task", payload);
      
      Alert.alert("Sucesso", "Tarefa registrada!");
      handleCancel(); // Fecha e reseta

    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao salvar na API.");
    }
  }

  return (
    <View style={styles.container}>
      <Image source={timerType.image} />
      
      <View style={styles.actions}>
        <View style={styles.context}>
          {pomodoro.map(p => (
            <ActionButton
              key={p.id}
              active={timerType.id === p.id}
              onPress={() => handleChangeTimer(p)}
              display={p.display} />
          ))}
        </View>
        
        <Timer totalSeconds={timeLeft} />
        
        {/* BOTÕES DE AÇÃO */}
        {isPaused ? (
          <View style={styles.buttonRow}>
            <FlowButton
              text="Continuar"
              onPress={startTimer}
              style={styles.mainButton} // Estilo para esticar
            />
            <FlowButton
              text="🔁"
              onPress={handleManualReset} // Chama a função que abre o modal
              style={styles.iconButton}   // Estilo bolinha
            />
          </View>
        ) : (
          <FlowButton
            isRunning={isRunning}
            onPress={() => {
              currentTime ? pauseTimer() : startTimer();
            }}
          />
        )}
      </View>
      
      <FlowFooter />

      {/* --- MODAL DE INPUT DA TAREFA --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sessão Finalizada!</Text>
            <Text style={styles.modalSubtitle}>O que você realizou?</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Descreva sua tarefa..."
              placeholderTextColor="#999"
              value={taskDescription}
              onChangeText={setTaskDescription}
              multiline
            />

            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalBtn, styles.btnCancel]} onPress={handleCancel}>
                <Text style={styles.btnText}>Pular</Text>
              </Pressable>
              
              <Pressable style={[styles.modalBtn, styles.btnSave]} onPress={handleSaveTask}>
                <Text style={styles.btnText}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#021123',
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
  context: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  
  // --- ESTILOS DOS BOTÕES ---
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center'
  },
  mainButton: {
    flex: 1, // Ocupa o espaço restante
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7272',
    minWidth: 0,
  },

  // --- ESTILOS DO MODAL ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#021123',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#B872FF',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B872FF',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#144480',
    color: '#FFF',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  modalBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnCancel: {
    backgroundColor: '#FF7272',
  },
  btnSave: {
    backgroundColor: '#00C851',
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});