import { TransactionCreatorComponent } from './components/transaction-creator/transaction-creator.component';
import { AccountCreatorComponent } from './components/account-creator/account-creator.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AccountEditorComponent } from './components/account-editor/account-editor.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionEditorComponent } from './components/transaction-editor/transaction-editor.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard]},
  {path: 'accounts/add', component: AccountCreatorComponent, canActivate: [AuthGuard]},
  {path: 'accounts/edit', component: AccountEditorComponent, canActivate: [AuthGuard]},
  {path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard]},
  {path: 'transactions/add', component: TransactionCreatorComponent, canActivate: [AuthGuard]},
  {path: 'transactions/edit', component: TransactionEditorComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
