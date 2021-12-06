import { AccountPayload } from './account-payload';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAccount(id: number): Observable<AccountPayload> {
    return this.http.get<AccountPayload>('http://localhost:8080/api/account/' + id);
  }

  getAllAccounts(): Observable<Array<AccountPayload>> {
    return this.http.get<Array<AccountPayload>>('http://localhost:8080/api/account');
  }

  delete(account: AccountPayload): Observable<any> {
    return this.http.delete('http://localhost:8080/api/account/' + account.id);
  }

  create(accountPayload: AccountPayload): Observable<AccountPayload> {
    return this.http.post<AccountPayload>('http://localhost:8080/api/account', accountPayload);
  }

  update(accountPayload: AccountPayload): Observable<AccountPayload> {
    return this.http.put<AccountPayload>('http://localhost:8080/api/account/', accountPayload);
  }
}
