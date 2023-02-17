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
import {User} from '../../model/user';
import {ConfigWebService} from '../../http/config-web.service';
import { Account } from '../../model/account';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let getUserSpy;
  let getItemSpy;

  beforeEach(waitForAsync(() => {
    const user  = {
      id: 'id'
    } as User

    const account  = {
      id: 'id',
      email: 'em@gmail.com'
    } as Account

    const localStorageSvcStub = jasmine.createSpyObj('LocalStorageService', ['getItem']);
    getItemSpy = localStorageSvcStub.getItem.and.returnValue(account)

    const configServiceStub = jasmine.createSpyObj('ConfigWebService', ['getUser']);
    getUserSpy = configServiceStub.getUser.and.returnValue(of(user))

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FontAwesomeIconsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [ProfileComponent],
      providers: [
        {
          provide: NotificationService
        },
        {
          provide: LocalStorageService, useValue: localStorageSvcStub
        },
        {
          provide: ConfigWebService, useValue: configServiceStub
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
