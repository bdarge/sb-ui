import { Observable } from 'rxjs';
import {Sort} from '@angular/material/sort';

export interface PageRequest {
  page: number;
  size: number;
  sort?: Sort;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  size: number;
  number: number;
}

export type PaginationEndpoint<T, Q> = (req: PageRequest, query: Q) => Observable<Page<T>>

export interface Query {
  search?: string,
  id?: string
}
