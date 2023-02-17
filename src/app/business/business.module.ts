import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {BusinessRoutingModule} from './business-routing.module';
import {SettingComponent} from './setting/setting.component';
import {ProfileComponent} from './profile/profile.component';
import { BusinessComponent } from './business/business.component';
import {SharedModule} from '../shared/shared.module';
import {FontAwesomeIconsModule} from '../shared/font.awesome.icons.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        SharedModule,
        BusinessRoutingModule,
        FontAwesomeIconsModule
    ],
  declarations: [
    SettingComponent,
    ProfileComponent,
    BusinessComponent,
    HomeComponent]
})
export class BusinessModule {
  constructor() {}
}
