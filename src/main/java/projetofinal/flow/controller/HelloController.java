package projetofinal.flow.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController // 1. Indica que essa classe controla endpoints REST
@RequestMapping("/hello") // 2. Define o caminho base da URL
@CrossOrigin(origins = "*")
public class HelloController {

    @GetMapping
    public Map<String, String> testeConexao() {
        // Vamos retornar um JSON parecido com: { "message": "..." }
        HashMap<String, String> resposta = new HashMap<>();
        resposta.put("message", "onde conecta não sai mais");

        return resposta;
    }
}
