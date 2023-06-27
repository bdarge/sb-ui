import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransactionComponent } from './edit-transaction.component';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeIconsModule} from '../../shared/font.awesome.icons.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {NotificationService} from '../../core/notifications/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TransactionWebService} from '../../http/transaction-web.service';
import {LocalStorageService} from '../../core/local-storage/local-storage.service';
import {CustomerWebService} from '../../http/customer-web.service';
import {Transaction} from '../../model/transaction';

describe('EditOrderComponent', () => {
  let component: EditTransactionComponent;
  let fixture: ComponentFixture<EditTransactionComponent>;
  let orderServiceStub: Partial<TransactionWebService>;
  let customerServiceStub: Partial<CustomerWebService>;
  const order = {
    id: '4',
    description: 'bolt'
  } as Transaction

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FontAwesomeIconsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [EditTransactionComponent],
      providers: [
        LocalStorageService,
        NotificationService,
        {
          provide: TransactionWebService, useValue: orderServiceStub
        },
        {
          provide: CustomerWebService, useValue: customerServiceStub
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {order}
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
