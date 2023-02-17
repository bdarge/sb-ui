import {Customer} from './customer';
import {Account} from './account';

export interface Transaction {
  id: string;
  description: string;
  createdAt: string;
  type: string;
  account: Account;
  customer: Customer;
}
