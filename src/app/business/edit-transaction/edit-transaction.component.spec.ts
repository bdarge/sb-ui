import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransactionComponent } from './edit-transaction.component';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeIconsModule} from '../../shared/font.awesome.icons.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {NotificationService} from '../../core/notifications/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TransactionWebService} from '../../http/transaction-web.service';
import {LocalStorageService} from '../../core/local-storage/local-storage.service';
import {CustomerWebService} from '../../http/customer-web.service';
import {Transaction} from '../../model/transaction';
import { Store } from '@ngrx/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EditTransactionComponent', () => {
  let component: EditTransactionComponent;
  let fixture: ComponentFixture<EditTransactionComponent>;
  const tServiceStub: Partial<TransactionWebService> = jasmine.createSpyObj(['page']);
  const customerServiceStub: Partial<CustomerWebService> = jasmine.createSpyObj(['page']);
  const localStorageSvc = jasmine.createSpyObj(['setItem', 'getItem']);
  localStorageSvc.getItem.and.returnValue([{name: 'en', currency: 'usd'}, {name: 'fr', currency: 'eu'}]);
  const testStore = jasmine.createSpyObj(['Store', ['pipe'], 'subscribe']);

  const t = {
    id: 4,
    description: 'bolt',
    createdAt: '1/1/2026',
    requestType: 'order',
    account: {accountId: 434, email: 'bob', userId: 323, businessId: '', roles: ['']},
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
      createdAt: '3/23/2011'
    },
    comment: 'my comment',
    deliveryDate: '2/1/2026',
    invoiceNumber: 382938,
    currency: 'USD',
  } as Transaction

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [EditTransactionComponent],
    imports: [SharedModule,
        FontAwesomeIconsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()],
    providers: [
        {
            provide: LocalStorageService, useValue: localStorageSvc
        },
        NotificationService,
        {
            provide: TransactionWebService, useValue: tServiceStub
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
            useValue: { t }
        },
        {
            provide: Store, useValue: testStore
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
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
