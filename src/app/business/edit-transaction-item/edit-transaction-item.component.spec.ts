import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransactionItemComponent } from './edit-transaction-item.component';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeIconsModule} from '../../shared/font.awesome.icons.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {NotificationService} from '../../core/notifications/notification.service';
import {TransactionWebService} from '../../http/transaction-web.service';
import {MAT_DIALOG_DATA, MatDialog,  MatDialogRef} from '@angular/material/dialog';
import {CustomerWebService} from '../../http/customer-web.service';
import { Transaction } from "../../model/transaction";

describe('EditTransactionItemComponent', () => {
  let component: EditTransactionItemComponent;
  let fixture: ComponentFixture<EditTransactionItemComponent>;
  let orderServiceStub: Partial<TransactionWebService>;
  let customerServiceStub: Partial<CustomerWebService>;
  const model = {
    order: { id: '12', description: 'motor' } as Transaction,
    item: { id: '2', orderId: '12', description: 'bolt' } as any
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FontAwesomeIconsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [EditTransactionItemComponent],
      providers: [
        {
          provide: NotificationService
        },
        {
          provide: TransactionWebService, useValue: orderServiceStub
        },
        {
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
          useValue: model
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransactionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
