import {Item} from './Item';

export interface OrderItem extends Item{
  type: 'OrderItem';
  orderId: string;
}
