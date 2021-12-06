import { AccountPayload } from 'src/app/shared/account-payload';
import { AccountService } from './../../shared/account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-creator',
  templateUrl: './account-creator.component.html',
  styleUrls: ['./account-creator.component.scss']
})
export class AccountCreatorComponent implements OnInit {
  newAccount: AccountPayload;
  accountCreatorForm!: FormGroup;

  constructor(private accountService: AccountService, private router: Router ) { 
    this.newAccount = {
      name: '',
      balance: '',
      currency: 'PLN'
    }
  }

  ngOnInit(): void {
    this.accountCreatorForm = new FormGroup({
      name: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required)
    });
  }

  get name() { return this.accountCreatorForm.get('name')!; }

  get balance() { return this.accountCreatorForm.get('balance')!; }

  create() {
    this.newAccount.name = this.name.value;
    this.newAccount.balance = this.balance.value;

    this.accountService.create(this.newAccount)
      .subscribe(() => {
        this.router.navigate(['/accounts']);
      });
  }

  cancel() {
    this.router.navigateByUrl('/accounts');
  }
}
