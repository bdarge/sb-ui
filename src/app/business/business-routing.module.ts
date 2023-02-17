import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingComponent} from './setting/setting.component';
import {ProfileComponent} from './profile/profile.component';
import {BusinessComponent} from './business/business.component';

const routes: Routes = [{
  path: '',
  component: BusinessComponent,
  children: [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      loadChildren: () =>
        import('./home/home.module').then(
          (m) => m.HomeModule
        )
    },
    {
      path: 'setting',
      component: SettingComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: '**',
      redirectTo: 'home'
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule {}

