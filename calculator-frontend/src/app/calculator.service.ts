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

    constructor(private http: HttpClient) {
    }

    calculate(calculationRequest: CalculationRequest): Observable<any> {
        return this.http.post(this.apiUrl, calculationRequest, { responseType: 'text' });
    }

}
