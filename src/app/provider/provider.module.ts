import { NgModule } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { TransactionWebService } from '../http/transaction-web.service';
import { ConfigWebService } from '../http/config-web.service';
import { CustomerWebService } from '../http/customer-web.service';
import { AuthWebService } from '../http/auth-web.service';

@NgModule({
  providers: [
    TransactionWebService,
    ConfigWebService,
    CustomerWebService,
    AuthWebService,
    GeneralService
  ]
})
export class ProviderModule {}

