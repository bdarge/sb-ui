import {Order} from './order';
import {OrderItem} from './orderItem';
import {Transaction} from './transaction';
import {ItemDatasource} from '../services/item.datasource';

export interface IViewModel {
  model: Transaction
  items: ItemDatasource
}

export interface OrderViewModel extends IViewModel {
  model: Order
  items: ItemDatasource
}
