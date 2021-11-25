import { AccountType } from "./account-type";

export class AccountModel {
    balance!: number;
    id!: number;
    name!: string;
    type!: AccountType;
}