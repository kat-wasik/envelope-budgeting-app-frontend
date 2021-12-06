import { TokenInterceptor } from './auth/shared/token-interceptor';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { HomeComponent } from './components/home/home.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountCreatorComponent } from './components/account-creator/account-creator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountEditorComponent } from './components/account-editor/account-editor.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionCreatorComponent } from './components/transaction-creator/transaction-creator.component';
import { TransactionEditorComponent } from './components/transaction-editor/transaction-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AccountsComponent,
    AccountCreatorComponent,
    AccountEditorComponent,
    TransactionsComponent,
    TransactionCreatorComponent,
    TransactionEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    NgxWebstorageModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
