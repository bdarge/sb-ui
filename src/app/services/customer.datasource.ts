import { TableDatasource } from './table.datasource';
import { Customer } from '../model/customer';
import { Query } from '../model/page';

export class CustomerDatasource extends TableDatasource<Customer, Query> {}
