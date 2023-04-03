import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from '../customer/customer.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { HomeComponent } from './home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: '',
      redirectTo: 'transaction',
      pathMatch: 'full'
    },
    {
      path: 'customer',
      component: CustomerComponent
    },
    {
      path: 'transaction',
      component: TransactionComponent
    },
    {
      path: '**',
      redirectTo: 'transaction'
    }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

