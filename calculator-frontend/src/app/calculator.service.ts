import { Injectable } from '@angular/core';
import { CalculationRequest } from './CalculationRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
/**
 * A service that provides calculation functionality by
 * sending requests to the server.
 */


@Injectable({
    providedIn: 'root'
})
export class CalculatorService {
    private apiUrl = 'http://localhost:8080/api/message'; // Your Spring Boot API URL
    private apiSaveCalculations = "http://localhost:8080/api/calculations"
    constructor(private http: HttpClient) {
    }

    calculate(calculationRequest: CalculationRequest): Observable<any> {
        return this.http.post(this.apiUrl, calculationRequest, { responseType: 'text' });
    }

    getAllPreviousCalculations(): Observable<CalculationRequest[]> {
        return this.http.get<CalculationRequest[]>(`${this.apiSaveCalculations}/get`);
    }
    
    saveCalculation(calculation: CalculationRequest): Observable<any> {
        return this.http.post(`${this.apiSaveCalculations}/post`, calculation, { responseType: 'text' });
    }

    deleteCalculation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiSaveCalculations}/delete/${id}`);
    }

}
