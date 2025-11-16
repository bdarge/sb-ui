import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AboutmeComponent } from './aboutme.component';
import { NotificationService } from '../../core/notifications/notification.service';
import { LocalStorageService } from '../../core/local-storage/local-storage.service';
import { ConfigWebService } from '../../http/config-web.service';
import { MatDialog } from '@angular/material/dialog';
import { Business } from '../../model/user';
import { Account } from '../../model/account';
import { of } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { FontAwesomeIconsModule } from '../../shared/font.awesome.icons.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AddressFormComponent } from '../address-form/address-form.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('AboutmeComponent', () => {
  let component: AboutmeComponent;
  let fixture: ComponentFixture<AboutmeComponent>;
  let getBusinessSpy;
  let getItemSpy;

  beforeEach(waitForAsync(() => {
    const business = {
      id: 1,
      hourlyRate: 45,
      name: 'TT plc',
      vat: '15',
      street: '434 t',
      postalCode: '4356',
      city: 'ss',
      country: 'usa',
      landline: '2346754843',
      mobile: '2346754843',
    } as Business;

    const account = {
      accountId: 34,
      email: 'em@gmail.com',
      userId: 1,
      businessId: '7',
      roles: ['admin'],
    } as Account;

    const localStorageSvcStub = jasmine.createSpyObj('LocalStorageService', [
      'getItem',
    ]);
    getItemSpy = localStorageSvcStub.getItem.and.returnValue(account);

    const configWebServiceStub = jasmine.createSpyObj('ConfigWebService', [
      'getBusiness',
    ]);
    getBusinessSpy = configWebServiceStub.getBusiness.and.returnValue(
      of(business)
    );

    TestBed.configureTestingModule({
      declarations: [AboutmeComponent, AddressFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        SharedModule,
        FormsModule,
        FontAwesomeIconsModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: NotificationService,
        },
        {
          provide: LocalStorageService,
          useValue: localStorageSvcStub,
        },
        {
          provide: ConfigWebService,
          useValue: configWebServiceStub,
        },
        {
          provide: MatDialog,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
