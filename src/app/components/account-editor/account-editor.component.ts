import { AccountPayload } from 'src/app/shared/account-payload';
import { AccountService } from './../../shared/account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-editor',
  templateUrl: './account-editor.component.html',
  styleUrls: ['./account-editor.component.scss']
})
export class AccountEditorComponent implements OnInit {
  editedAccount!: AccountPayload;
  accountEditorForm!: FormGroup;
  accountId!: number;

  constructor(private accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute ) { 
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .subscribe(params => {
      this.accountId = params['id'];
    });

    this.accountEditorForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });

    this.accountService.getAccount(this.accountId).subscribe(account => {
      this.editedAccount = account;
      this.accountEditorForm.setValue({ name: this.editedAccount['name']});
    });
  }

  get name() { return this.accountEditorForm.get('name')!; }

  update(accountPayload: AccountPayload) {
    accountPayload.name = this.name.value;
    this.accountService.update(accountPayload).subscribe();
    this.router.navigateByUrl('/accounts');
  }

  cancel() {
    this.router.navigateByUrl('/accounts');
  }
}