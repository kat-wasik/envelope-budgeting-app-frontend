import { HttpClient } from '@angular/common/http';
import { TransactionPayload } from './transaction-payload';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getTransaction(id: number): Observable<TransactionPayload> {
    return this.http.get<TransactionPayload>('http://localhost:8080/api/transaction/' + id);
  }

  getTransactionsByAccount(accountId: number): Observable<Array<TransactionPayload>> {
    return this.http.get<Array<TransactionPayload>>('http://localhost:8080/api/transaction/account?id=' + accountId);
  }

  delete(transactionId: number | undefined): Observable<any> {
    return this.http.delete('http://localhost:8080/api/transaction/' + transactionId);
  }

  create(transaction: TransactionPayload): Observable<TransactionPayload> {
    return this.http.post('http://localhost:8080/api/transaction/', transaction);
  }

  update(transactionPayload: TransactionPayload): Observable<TransactionPayload> {
    return this.http.put<TransactionPayload>('http://localhost:8080/api/transaction/', transactionPayload);
  }
}