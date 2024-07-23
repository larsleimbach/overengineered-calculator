package de.trion.calculatorbackend;

/**
 * Contains the request data for the calculator.
 */
public class CalculationRequest {
    private String text;

    // getters and setters
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
