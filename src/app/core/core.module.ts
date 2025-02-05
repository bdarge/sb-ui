import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AnimationsService } from './animations/animations.service';
import { NotificationService } from './notifications/notification.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { ROUTE_ANIMATIONS_ELEMENTS, routeAnimations } from './animations/route.animations';

import {
  AppState,
  metaReducers,
  reducers
} from './core.state';
import { SettingsEffects } from './settings/settings.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {
  selectSettingsLanguage,
  selectTheme,
  selectCurrency
} from './settings/settings.selectors';
import {
  FaIconLibrary,
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

// AoT requires an exported function for factories
export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import {
  faCog,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';
import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { HttpRequestInterceptor } from './http-interceptors/http.interceptor';

export {
  AppState,
  LocalStorageService,
  AnimationsService,
  NotificationService,
  ROUTE_ANIMATIONS_ELEMENTS,
  routeAnimations,
  selectTheme,
  selectSettingsLanguage,
  selectCurrency
};

@NgModule({ declarations: [],
    exports: [
        // angular
        FormsModule,
        // material
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatSelectModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatButtonModule,
        // 3rd party
        FontAwesomeModule,
        TranslateModule
    ], imports: [
        // angular
        CommonModule,
        FormsModule,
        // material
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatSelectModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatButtonModule,
        // ngrx
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([
            SettingsEffects
        ]),
        FontAwesomeModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient]
            }
        })], providers: [
        AnimationsService,
        NotificationService,
        LocalStorageService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
        { provide: ErrorHandler, useClass: AppErrorHandler },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    faIconLibrary: FaIconLibrary
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
    faIconLibrary.addIcons(
      faCog as IconDefinition,
      faBars as IconDefinition
    );
  }
}
