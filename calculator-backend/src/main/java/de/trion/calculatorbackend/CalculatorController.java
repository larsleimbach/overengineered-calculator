package de.trion.calculatorbackend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CalculatorController {

    @Autowired
    private CalculatorService calculatorService = new CalculatorService();

    @PostMapping("/message")
    public ResponseEntity<String> receiveMessage(@RequestBody CalculationRequest message) {
        // Process the message
        String reponse = calculatorService.calculate(message);
        return ResponseEntity.ok(reponse);
    }

    @GetMapping("/calculations/get")
    public List<CalculationRequest> getAllCalculations() {
        return calculatorService.getAllCalculations();
    }

    @PostMapping("/calculations/post")
    public ResponseEntity<String> saveCalculation(@RequestBody CalculationRequest calculation) {
        CalculationRequest cal_requ = calculatorService.saveCalculation(calculation);
        return ResponseEntity.ok("Saved: " + cal_requ.getText());
    }

    @DeleteMapping("calculations/delete/{id}")
    public ResponseEntity<Void> deleteCalculation(@PathVariable Long id) {
        calculatorService.deleteCalculation(id);
        return ResponseEntity.noContent().build();
    }

}
