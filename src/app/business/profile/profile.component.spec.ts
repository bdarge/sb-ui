import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeIconsModule} from '../../shared/font.awesome.icons.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {NotificationService} from '../../core/notifications/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {LocalStorageService} from '../../core/local-storage/local-storage.service';
import {of} from 'rxjs';
import {User, Address, Business, Role} from '../../model/user';
import { ConfigWebService } from '../../http/config-web.service';
import { Account } from '../../model/account';
import {AddressFormComponent} from '../address-form/address-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let getUserSpy;
  let getItemSpy;

  beforeEach(waitForAsync(() => {
    const user  = {
      id: 1,
      username: 'mike',
      business: {
        id: 7
      } as Business,
      address: {
        id: 1,
        street: '434 t',
        postalCode: '4356',
        city: 'ss',
        country: 'usa',
        landline: '2346754843',
        mobile: '2346754843'
      } as Address,
      roles: [{
        id: 1,
        name: 'admin'
      } as Role],
      accountId: '34'
    } as User

    const account  = {
      accountId: 34,
      email: 'em@gmail.com',
      userId: 1,
      businessId: '7',
      roles: ['admin']
    } as Account

    const localStorageSvcStub = jasmine.createSpyObj('LocalStorageService', ['getItem']);
    getItemSpy = localStorageSvcStub.getItem.and.returnValue(account)

    const configWebServiceStub = jasmine.createSpyObj('ConfigWebService', ['getUser']);
    getUserSpy = configWebServiceStub.getUser.and.returnValue(of(user))

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FormsModule,
        FontAwesomeIconsModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [ProfileComponent, AddressFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: NotificationService
        },
        {
          provide: LocalStorageService, useValue: localStorageSvcStub
        },
        {
          provide: ConfigWebService, useValue: configWebServiceStub
        },
        {
          provide: MatDialog
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
