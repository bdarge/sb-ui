import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionComponent } from './transaction.component';
import {LocalStorageService} from '../../core/local-storage/local-storage.service';
import {NotificationService} from '../../core/notifications/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {TransactionWebService} from '../../http/transaction-web.service';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeIconsModule} from '../../shared/font.awesome.icons.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {Page, PageRequest, Query} from '../../model/page';
import {from, Observable} from 'rxjs';
import {Transaction} from '../../model/transaction';

describe('OrderComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;
  let orderServiceStub: Partial<TransactionWebService>;

  beforeEach(waitForAsync(() => {
    orderServiceStub = {
      page(request: PageRequest, query: Query): Observable<Page<Transaction>> {
        return from(new Promise<Page<Transaction>>((resolve, reject) => {
          resolve({
            data: [{
              id: '1',
              description: 'alex'
            } as Transaction],
            total: 1,
            limit: request.size,
            page: request.page
          } as Page<Transaction>)
        }))
      }
    }
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FontAwesomeIconsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [ TransactionComponent ],
      providers: [
        LocalStorageService,
        NotificationService,
        MatDialog,
        {
          provide: TransactionWebService,
          useValue: orderServiceStub
        }
      ]
    })
    .compileComponents();
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
