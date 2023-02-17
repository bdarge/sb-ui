import { NgModule } from '@angular/core';
import {CustomerDatasource} from './customer.datasource';

@NgModule({
  providers: [
    CustomerDatasource
  ]
})
export class ServiceModule {}
