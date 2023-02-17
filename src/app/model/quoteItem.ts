import {Item} from './Item';

export interface QuoteItem extends Item {
  type: 'QuoteItem';
  quoteId: string;
}
