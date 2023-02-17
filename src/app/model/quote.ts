import { QuoteItem } from './quoteItem';
import {Transaction} from './transaction';

export interface Quote extends Transaction{
  quoteNumber?: number
  quoteItems?: QuoteItem[]
  quoteSummary: string
}
