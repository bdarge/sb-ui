import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/services/auth-guard.service';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'business',
    pathMatch: 'full'
  },
  {
    path: 'business',
    loadChildren: () =>
      import('./business/business.module').then(
        (m) => m.BusinessModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules
})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

