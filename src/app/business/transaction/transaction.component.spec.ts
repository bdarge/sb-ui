import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionComponent } from './transaction.component';
import { LocalStorageService } from '../../core/local-storage/local-storage.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionWebService } from '../../http/transaction-web.service';
import { SharedModule } from '../../shared/shared.module';
import { FontAwesomeIconsModule } from '../../shared/font.awesome.icons.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Page, PageRequest, Query } from '../../model/page';
import { from, Observable } from 'rxjs';
import { Transaction } from '../../model/transaction';
import { Store } from '@ngrx/store';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;
  let tServiceStub = jasmine.createSpyObj(['page']);
  const localStorageSvc = jasmine.createSpyObj(['setItem', 'getItem']);
  localStorageSvc.getItem.and.returnValue([
    { name: 'en', currency: 'usd' },
    { name: 'fr', currency: 'eu' },
  ]);
  const testStore = jasmine.createSpyObj('Store', ['pipe']);

  beforeEach(waitForAsync(() => {
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
    tServiceStub = {
      page(request: PageRequest, query: Query): Observable<Page<Transaction>> {
        return from(
          new Promise<Page<Transaction>>((resolve, reject) => {
            resolve({
              data: [t],
              total: 1,
              limit: request.size,
              page: request.page,
            } as Page<Transaction>);
          })
        );
      },
    };
    TestBed.configureTestingModule({
      declarations: [TransactionComponent],
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
        NotificationService,
        MatDialog,
        {
          provide: TransactionWebService,
          useValue: tServiceStub,
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
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
