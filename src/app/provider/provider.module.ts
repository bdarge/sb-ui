import { NgModule } from '@angular/core';
import {GeneralService} from '../services/generalService';
import {OrderWebService} from '../http/order-web.service';
import {QuoteWebService} from '../http/quote-web.service';
import {ConfigWebService} from '../http/config-web.service';
import {CustomerWebService} from '../http/customer-web.service';
import {AuthWebService} from '../http/auth-web.service';

@NgModule({
  providers: [
    OrderWebService,
    QuoteWebService,
    ConfigWebService,
    CustomerWebService,
    AuthWebService,
    GeneralService
  ]
})
export class ProviderModule {}

