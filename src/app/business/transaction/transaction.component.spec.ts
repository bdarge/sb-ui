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
import {Order} from '../../model/order';

describe('OrderComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;
  let orderServiceStub: Partial<TransactionWebService>;

  beforeEach(waitForAsync(() => {
    orderServiceStub = {
      page(request: PageRequest, query: Query): Observable<Page<Order>> {
        return from(new Promise<Page<Order>>((resolve, reject) => {
          resolve({
            content: [{
              id: '1',
              description: 'alex'
            } as Order],
            totalElements: 1,
            size: request.size,
            number: request.page
          } as Page<Order>)
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
