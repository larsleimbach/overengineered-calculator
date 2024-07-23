package de.trion.calculatorbackend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CalculatorController {

    @PostMapping("/message")
    public ResponseEntity<String> receiveMessage(@RequestBody CalculationRequest message) {
        // Process the message
        // System.out.println("\nReceived message: " + message.getText());
        String reponse = CalculatorService.calculate(message);
        return ResponseEntity.ok(reponse);
    }

}
