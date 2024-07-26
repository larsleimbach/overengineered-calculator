import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CalculationRequest } from './CalculationRequest';
import { CalculatorService } from './calculator.service';


@Component({
    selector: 'calc-root',
    standalone: true,
    imports: [],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit{
    /**
     * The result of the calculation.
     */
    result: string | any = null;
    previousCalculations: CalculationRequest[] = [];
    @ViewChild('listContainer', { static: true }) listContainer!: ElementRef;


    constructor(private calculatorService: CalculatorService) {
        
    }
    ngAfterViewInit(): void {
        this.loadPreCalculation();
    }

    

    loadPreCalculation(): void {
        this.calculatorService.getAllPreviousCalculations().subscribe(data => {
          this.previousCalculations = data.reverse();
          
          const listContainer = this.listContainer.nativeElement;
          // empty list
          while (listContainer.firstChild) {
            listContainer.removeChild(listContainer.firstChild);
          }
          this.previousCalculations.forEach(calculation => {
                const listItem = document.createElement('li');
                listItem.textContent = `${calculation.text}`;

                var button = document.createElement('button');
                // Set the text content of the button
                button.textContent = 'Delete';

                // Attach a click event listener to the button
                button.addEventListener('click', () => this.deleteCalculation(calculation.id));

                // Append the button to the body or any other container
                listItem.appendChild(button);
                listContainer.appendChild(listItem);
          });
        });
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

    deleteCalculation(id: number | undefined): void {
        if(id){
            this.calculatorService.deleteCalculation(id).subscribe(() => {
              this.previousCalculations = this.previousCalculations.filter(calc => calc.id !== id);
              this.loadPreCalculation(); // Refresh the list after deletion
            });
        }
        else{
            console.log("ID is",id,"-> delete operation not possible.")
        }
    }

    save_calculation() {
        const result_num = parseFloat(this.result)
        // console.log("result",this.result,"conversion result",result_num)
        if(!isNaN(result_num) || this.result == "The answer to the ultimate question of life, the universe, and everything" ){
            // result is a number
            let text = (document.getElementById('textInput') as HTMLInputElement).value;
            const message: CalculationRequest = { text: text + " = " + this.result };
            // console.log("message:",message)
            // send to backend
            this.calculatorService.saveCalculation(message).subscribe(response => {
                // renew list
                this.loadPreCalculation()
              });
            
        }
        else {
            alert("NOT posible to save: Result is no number.")
        }

    }

}
