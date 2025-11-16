import { Customer } from './customer';
import { Account } from './account';
import { TransactionItem } from './transactionItem';
import { Query } from './page';

export interface Transaction {
  id: number;
  description: string;
  createdAt: string;
  requestType: string;
  account: Account;
  customer: Customer;
  comment: string;
  deliveryDate: string;
  invoiceNumber?: number;
  items?: TransactionItem[];
  currency: string;
}

export interface TranQuery extends Query {
  requestType: string;
}
