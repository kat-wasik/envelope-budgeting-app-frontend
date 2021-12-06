import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionPayload } from 'src/app/shared/transaction-payload';
import { TransactionService } from 'src/app/shared/transaction.service';

@Component({
  selector: 'app-transaction-creator',
  templateUrl: './transaction-creator.component.html',
  styleUrls: ['./transaction-creator.component.scss']
})
export class TransactionCreatorComponent implements OnInit {
  newTransaction: TransactionPayload;
  transactionCreatorForm!: FormGroup;
  accountId!: number;

  constructor(private transactionService: TransactionService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.newTransaction = {
      amount: '',
      date: '',
      description: '',
      currency: 'PLN'
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.accountId = params['accountId'];
    });

    this.transactionCreatorForm = new FormGroup({
      amount: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  get amount() { return this.transactionCreatorForm.get('amount')!; }

  get date() { return this.transactionCreatorForm.get('date')!; }

  get description() { return this.transactionCreatorForm.get('description')!; }

  create() {
    this.newTransaction.amount = this.amount.value;
    this.newTransaction.date = this.date.value;
    this.newTransaction.description = this.description.value;
    this.newTransaction.account = this.accountId;
    this.newTransaction.currency = 'PLN';

    this.transactionService.create(this.newTransaction)
      .subscribe(() => {
        this.router.navigate(['/transactions'], { queryParams: {accountId: this.accountId}});
      });
  }

  cancel() {
    this.router.navigateByUrl('/transactions');
  }
}
