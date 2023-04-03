export interface Customer {
  id: string;
  name: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  updatedAt: string;
  createdAt: string;
}

export interface Customers {
  limit: number;
  data: Customer[];
}
