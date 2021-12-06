import { TransactionPayload } from 'src/app/shared/transaction-payload';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/shared/transaction.service';
@Component({
  selector: 'app-transaction-editor',
  templateUrl: './transaction-editor.component.html',
  styleUrls: ['./transaction-editor.component.scss']
})
export class TransactionEditorComponent implements OnInit {
  editedTransaction!: TransactionPayload;
  transactionEditorForm!: FormGroup;
  transactionId!: number;

  constructor(private transactionService: TransactionService, private router: Router, private activatedRoute: ActivatedRoute ) { 
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .subscribe(params => {
      this.transactionId = params['id'];
    });

    this.transactionEditorForm = new FormGroup({
      amount: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    this.transactionService.getTransaction(this.transactionId).subscribe(transaction => {
      this.editedTransaction = transaction;
      this.transactionEditorForm.setValue({
        amount: this.editedTransaction['amount'],
        date: this.editedTransaction['date'],
        description: this.editedTransaction['description'],
      });
      console.log(this.amount.value);
    });
  }

  get amount() { return this.transactionEditorForm.get('amount')!; }

  get date() { return this.transactionEditorForm.get('date')!; }

  get description() { return this.transactionEditorForm.get('description')!; }


  update(transactionPayload: TransactionPayload) {
    transactionPayload.amount = this.amount.value;
    transactionPayload.date = this.date.value;
    transactionPayload.description = this.description.value;

    this.transactionService.update(transactionPayload).subscribe(() => {
      this.router.navigate(['/transactions'], { queryParams: {accountId: this.editedTransaction.account}});
    });
  }

  cancel() {
    this.router.navigateByUrl('/transactions');
  }
}
