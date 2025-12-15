package projetofinal.flow.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projetofinal.flow.dto.TaskDTO;
import projetofinal.flow.repository.TaskRepository; // Importe o repository

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "*")
public class TaskController {

    // Injeção de dependência do nosso banco de memória
    private final TaskRepository repository;

    public TaskController(TaskRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Void> salvarTarefa(@RequestBody TaskDTO dto) {
        System.out.println("Salvando: " + dto.descricao());

        // 1. Salva na lista em memória
        repository.salvar(dto);

        return ResponseEntity.ok().build();
    }
}