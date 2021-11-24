import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountModel } from './account-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAllAccounts(): Observable<Array<AccountModel>> {
    return this.http.get<Array<AccountModel>>('http://localhost:8080/api/account');
  }
}
