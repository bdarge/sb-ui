import {OrderItem} from './orderItem';
import {Transaction} from './transaction';

export interface Order extends Transaction{
  comment: string;
  deliveryDate: string;
  invoiceNumber?: number;
  purchaseOrderNumber?: number;
  orderItems?: OrderItem[];
  currency: string;
}
