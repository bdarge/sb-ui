import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {SharedModule} from '../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationService} from '../core/notifications/notification.service';
import {LocalStorageService} from '../core/local-storage/local-storage.service';
import {UntypedFormBuilder} from '@angular/forms';
import { AuthWebService} from '../http/auth-web.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        NotificationService,
        LocalStorageService,
        UntypedFormBuilder,
        AuthWebService]
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
