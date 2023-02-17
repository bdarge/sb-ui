import {Quote} from './quote';
import {IViewModel} from './orderViewModel';
import {ItemDatasource} from '../services/item.datasource';

export interface QuoteViewModel extends IViewModel {
  model: Quote
  items: ItemDatasource
}
