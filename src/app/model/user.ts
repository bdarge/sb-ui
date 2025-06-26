export interface Address {
  id: number;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  landline: string;
  mobile: string;
}

export interface User {
  id: number;
  username: string;
  address: Address;
  business: Business;
  accountId: string;
  roles: Role[];
}

export interface Business {
  id: number;
  hourlyRate: number;
  name: string;
  vat: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  landline: string;
  mobile: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface Language {
  locale: string;
  currency: string;
}