import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ProviderModule } from './provider/provider.module';
import { ServiceModule } from './services/service.module';
import { FontAwesomeIconsModule } from './shared/font.awesome.icons.module';
import { RegisterComponent } from './register/register.component';
import { AppConfigService } from './services/app.config.service';

export function initConfig(configService: AppConfigService) {
  // load the config file in this function
  return () => configService.load()
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeIconsModule,
    SharedModule,
    ProviderModule,
    ServiceModule,
    CoreModule,
    AppRoutingModule], providers: [
      provideAppInitializer(() => {
        const initializerFn = (initConfig)(inject(AppConfigService));
        return initializerFn();
      }),
      provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
