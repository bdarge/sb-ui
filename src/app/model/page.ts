import { Observable } from 'rxjs';
import {Sort} from '@angular/material/sort';

export interface PageRequest {
  page: number;
  size: number;
  sort?: Sort;
}

export interface Page<T> {
  data: T[];
  total: number;
  limit: number;
  page: number;
}

export type PaginationEndpoint<T, Q> = (req: PageRequest, query: Q) => Observable<Page<T>>

export interface Query {
  search?: string,
  id?: string
}
