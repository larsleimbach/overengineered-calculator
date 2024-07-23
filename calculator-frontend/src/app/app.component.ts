import { Component, ViewChild, ElementRef } from '@angular/core';
import { CalculationRequest } from './CalculationRequest';
import { CalculatorService } from './calculator.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'calc-root',
    standalone: true,
    imports: [],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent{
    /**
     * The result of the calculation.
     */
    result: string | any = null;

    constructor(private calculatorService: CalculatorService) {
        
    }

    /**
     * Calculate the result by using the CalculatorService.
     */
    calculate() {
        let text = (document.getElementById('textInput') as HTMLInputElement).value;

        const message: CalculationRequest = { text: text };
        this.calculatorService.calculate(message).subscribe(response => {
          this.result = response;
        });
        

    }

}
