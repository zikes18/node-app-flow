package projetofinal.flow.repository;

import org.springframework.stereotype.Repository;
import projetofinal.flow.dto.TaskDTO;
import java.util.ArrayList;
import java.util.List;

@Repository
public class TaskRepository {
    // Essa lista vai guardar as tarefas enquanto o servidor estiver rodando
    private final List<TaskDTO> tarefas = new ArrayList<>();

    public void salvar(TaskDTO tarefa) {
        tarefas.add(tarefa);
    }

    public List<TaskDTO> listarTodas() {
        return tarefas;
    }
}