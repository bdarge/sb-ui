import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule} from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule} from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { ProviderModule} from './provider/provider.module';
import { ServiceModule} from './services/service.module';
import { FontAwesomeIconsModule } from './shared/font.awesome.icons.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeIconsModule,
    SharedModule,
    ProviderModule,
    ServiceModule,

    HttpClientModule,
    CoreModule,

    FlexLayoutModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
