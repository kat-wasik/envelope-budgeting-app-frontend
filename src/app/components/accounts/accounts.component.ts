import { AccountService } from './../../shared/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountPayload } from 'src/app/shared/account-payload';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accounts$: Array<AccountPayload> = [];

  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.getAllAccounts().subscribe(accounts => {
      this.accounts$ = accounts;
    })
   }

  ngOnInit(): void {
  }

  delete(account: AccountPayload) {
    this.accountService.delete(account).subscribe();
    window.location.reload();
    }

  goToTransactions(accountId: number | undefined) {
    this.router.navigate(['transactions'], { queryParams: { accountId: accountId } });
  }

  editAccount(id: number | undefined) {
    this.router.navigate(['accounts/edit'], { queryParams: { id: id}})
  }
}
