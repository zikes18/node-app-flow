package projetofinal.flow.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import projetofinal.flow.repository.TaskRepository;

@Controller // Atenção: Apenas @Controller para retornar HTML
public class WebController {

    private final TaskRepository repository;

    public WebController(TaskRepository repository) {
        this.repository = repository;
    }

    // Quando acessar http://localhost:8080/painel
    @GetMapping("/painel")
    public String mostrarPainel(Model model) {
        // Pegamos a lista que o React Native preencheu
        var listaDeTarefas = repository.listarTodas();

        // Enviamos para o HTML com o nome "tarefas"
        model.addAttribute("tarefas", listaDeTarefas);

        // Retorna o nome do arquivo HTML (sem .html)
        return "task";
    }
}