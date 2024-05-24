import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { TransactionComponent } from '../transaction/transaction.component';
import { CustomerComponent } from '../customer/customer.component';
import { EditTransactionComponent } from '../edit-transaction/edit-transaction.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { EditTransactionItemComponent } from '../edit-transaction-item/edit-transaction-item.component';
import { SharedModule } from '../../shared/shared.module';
import { FontAwesomeIconsModule } from '../../shared/font.awesome.icons.module';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        TransactionComponent,
        CustomerComponent,
        EditTransactionComponent,
        EditCustomerComponent,
        EditTransactionItemComponent
    ],
    imports: [
        SharedModule,
        HomeRoutingModule,
        FontAwesomeIconsModule,
        NgxMaskDirective
    ],
    providers: [
        provideNgxMask()
    ]
})
export class HomeModule { }
