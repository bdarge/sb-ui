import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from '../customer/customer.component';
import { OrderComponent } from '../order/order.component';
import {QuoteComponent} from '../quote/quote.component';
import {HomeComponent} from './home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: '',
      redirectTo: 'order',
      pathMatch: 'full'
    },
    {
      path: 'customer',
      component: CustomerComponent
    },
    {
      path: 'order',
      component: OrderComponent
    },
    {
      path: 'quote',
      component: QuoteComponent
    },
    {
      path: '**',
      redirectTo: 'order'
    }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

