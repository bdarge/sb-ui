import { User } from './user';

export interface InvoiceMetadata {
  id: string;
  purchaseOrderNumberBase: string;
  purchaseQuoteNumberBase: string;
  user?: User;
}
