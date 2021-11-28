import { AccountService } from './../../shared/account.service';
import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/shared/account-model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accounts$: Array<AccountModel> = [];

  constructor(private accountService: AccountService) {
    this.accountService.getAllAccounts().subscribe(accounts => {
      this.accounts$ = accounts;
    })
   }

  ngOnInit(): void {
  }

  delete(account: AccountModel) {
    this.accountService.delete(account).subscribe();
    window.location.reload();
    }
}
