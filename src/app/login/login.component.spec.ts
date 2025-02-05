import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {SharedModule} from '../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationService} from '../core/notifications/notification.service';
import {LocalStorageService} from '../core/local-storage/local-storage.service';
import {UntypedFormBuilder} from '@angular/forms';
import { AuthWebService} from '../http/auth-web.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [LoginComponent],
    imports: [SharedModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        RouterTestingModule],
    providers: [
        NotificationService,
        LocalStorageService,
        UntypedFormBuilder,
        AuthWebService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
