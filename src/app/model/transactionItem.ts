export class TransactionItem {
  id: number;
  description: string;
  qty: number;
  unit: string;
  currency: string;
  unitPrice: number;
  transactionId: number;
}

export interface Currency {
  to: String;
  base: String;
  value: Number;
}

export interface CurrencyRequest {
  base: String;
  symbol: String;
}