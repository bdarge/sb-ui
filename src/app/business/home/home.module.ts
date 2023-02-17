import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {OrderComponent} from '../order/order.component';
import {CustomerComponent} from '../customer/customer.component';
import {EditOrderComponent} from '../edit-order/edit-order.component';
import {EditCustomerComponent} from '../edit-customer/edit-customer.component';
import {EditOrderItemComponent} from '../edit-order-item/edit-order-item.component';
import {QuoteComponent} from '../quote/quote.component';
import {EditQuoteComponent} from '../edit-quote/edit-quote.component';
import {EditQuoteItemComponent} from '../edit-quote-item/edit-quote-item.component';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeIconsModule} from '../../shared/font.awesome.icons.module';


@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        OrderComponent,
        CustomerComponent,
        EditOrderComponent,
        EditCustomerComponent,
        EditOrderItemComponent,
        QuoteComponent,
        EditQuoteComponent,
        EditQuoteItemComponent,
    ],
    imports: [
        SharedModule,
        HomeRoutingModule,
        FontAwesomeIconsModule
    ]
})
export class HomeModule { }
