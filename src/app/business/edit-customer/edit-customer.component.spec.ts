import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerComponent } from './edit-customer.component';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeIconsModule} from '../../shared/font.awesome.icons.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {CustomerComponent} from '../customer/customer.component';
import {NotificationService} from '../../core/notifications/notification.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LocalStorageService} from '../../core/local-storage/local-storage.service';
import {Customer} from '../../model/customer';
import {CustomerWebService} from '../../http/customer-web.service';

describe('EditCustomerComponent', () => {
  let component: EditCustomerComponent;
  let fixture: ComponentFixture<EditCustomerComponent>;
  let customerServiceStub: Partial<CustomerWebService>;
  const customer = {
    id: '4',
    name: 'err'
  } as Customer

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FontAwesomeIconsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [CustomerComponent, EditCustomerComponent],
      providers: [
        {
          provide: LocalStorageService
        },
        {
          provide: NotificationService
        }, {
          provide: CustomerWebService, useValue: customerServiceStub
        },
        {
          provide: MatDialog
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {customer}
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
