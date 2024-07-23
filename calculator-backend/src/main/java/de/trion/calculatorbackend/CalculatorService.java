package de.trion.calculatorbackend;

import net.objecthunter.exp4j.ExpressionBuilder;

public class CalculatorService {

    /**
     * Process the incoming request and calculate the result.
     */
    public static String calculate(CalculationRequest request) {
        try {
            if (request.getText() == "") {
                // deltes last result
                return "";
            }

            double result = new ExpressionBuilder(request.getText()).build().evaluate();

            return Double.toString(result);
        } catch (Exception e) {
            // e.printStackTrace();
            return "No correct mathematical equation";
        }

    }

}
