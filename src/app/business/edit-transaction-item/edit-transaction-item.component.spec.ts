import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransactionItemComponent } from './edit-transaction-item.component';
import { SharedModule } from '../../shared/shared.module';
import { FontAwesomeIconsModule } from '../../shared/font.awesome.icons.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService } from '../../core/notifications/notification.service';
import { TransactionWebService } from '../../http/transaction-web.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CustomerWebService } from '../../http/customer-web.service';
import { Transaction } from '../../model/transaction';
import { LocalStorageService } from '../../core/local-storage/local-storage.service';
import { Store } from '@ngrx/store';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('EditTransactionItemComponent', () => {
  let component: EditTransactionItemComponent;
  let fixture: ComponentFixture<EditTransactionItemComponent>;
  const tServiceStub: Partial<TransactionWebService> = jasmine.createSpyObj([
    'page',
  ]);
  const customerServiceStub: Partial<CustomerWebService> = jasmine.createSpyObj(
    ['page']
  );
  const localStorageSvc = jasmine.createSpyObj(['setItem', 'getItem']);
  localStorageSvc.getItem.and.returnValue([
    { name: 'en', currency: 'usd' },
    { name: 'fr', currency: 'eu' },
  ]);
  const testStore = jasmine.createSpyObj(['Store', ['pipe'], 'subscribe']);

  const t = {
    id: 4,
    description: 'bolt',
    createdAt: '1/1/2026',
    requestType: 'order',
    account: {
      accountId: 434,
      email: 'bob',
      userId: 323,
      businessId: '',
      roles: [''],
    },
    customer: {
      id: '434',
      name: 'Tom',
      street: '434 dummy',
      postalCode: '20202',
      city: 'aa',
      country: 'usa',
      email: 'w@d.com',
      phone: '555-343-3434',
      updatedAt: '3/23/2011',
      createdAt: '3/23/2011',
    },
    comment: 'my comment',
    deliveryDate: '2/1/2026',
    invoiceNumber: 382938,
    currency: 'USD',
  } as Transaction;

  const model = {
    transaction: t,
    item: {
      id: 2,
      transactionId: 4,
      description: 'bolt',
      qty: 34,
      unit: 'lb',
      currency: 'usd',
      unitPrice: 3,
    } as any,
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditTransactionItemComponent],
      imports: [
        SharedModule,
        FontAwesomeIconsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: LocalStorageService,
          useValue: localStorageSvc,
        },
        {
          provide: NotificationService,
        },
        {
          provide: TransactionWebService,
          useValue: tServiceStub,
        },
        {
          provide: CustomerWebService,
          useValue: customerServiceStub,
        },
        {
          provide: MatDialog,
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: model,
        },
        {
          provide: Store,
          useValue: testStore,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
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
