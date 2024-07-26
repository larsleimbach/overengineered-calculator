package de.trion.calculatorbackend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.objecthunter.exp4j.ExpressionBuilder;

@Service
public class CalculatorService {

    @Autowired
    private CalculationRepository calculationRepository;

    /**
     * Process the incoming request and calculate the result.
     */
    public String calculate(CalculationRequest request) {
        try {
            if (request.getText() == "") {
                // deltes last result
                return "";
            }
            if ("The answer to the ultimate question of life, the universe, and everything".equals(request.getText())) {
                return "42";
            }
            double result = new ExpressionBuilder(request.getText()).build().evaluate();
            String result_str = Double.toString(result);
            return result_str;
        } catch (Exception e) {
            return "No correct mathematical equation";
        }
    }

    public List<CalculationRequest> getAllCalculations() {
        return calculationRepository.findAll();
    }

    public CalculationRequest saveCalculation(CalculationRequest calculation) {
        return calculationRepository.save(calculation);
    }

    public void deleteCalculation(Long id) {
        calculationRepository.deleteById(id);
    }

}
