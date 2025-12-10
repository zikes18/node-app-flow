package projetofinal.flow.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projetofinal.flow.dto.TaskDTO;


@RestController
@RequestMapping("/task")
public class taskController {

    @GetMapping
    public String viewTask(){
        return """
            Flow Hello Worth <br>
            aplicativo spring <br>
            sempre um novo projeto <br>
                """;
    }
    @PostMapping
    public void registerTask(@RequestBody TaskDTO dados){
        
        System.out.println(dados);
    }
}
