import { TransactionService } from './../../shared/transaction.service';
import { TransactionPayload } from './../../shared/transaction-payload';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions$: Array<TransactionPayload> = [];
  accountId!: number;

  constructor(private transactionService: TransactionService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.accountId = params['accountId'];
      });

    this.transactionService.getTransactionsByAccount(this.accountId).subscribe(transactions =>
      this.transactions$ = transactions);
  }

  ngOnInit(): void {

  }

  editTransaction(id: number | undefined) {
    this.router.navigate(['transactions/edit'], { queryParams: { id: id } })
  }

  delete(transaction: TransactionPayload) {
    this.transactionService.delete(transaction.id).subscribe();
    window.location.reload();
  }

  addTransaction(accountId: number) {
    this.router.navigate(['transactions/add'], { queryParams: { accountId: accountId } })
  }

}
