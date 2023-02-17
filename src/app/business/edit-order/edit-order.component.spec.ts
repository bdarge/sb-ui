import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderComponent } from './edit-order.component';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeIconsModule} from '../../shared/font.awesome.icons.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {NotificationService} from '../../core/notifications/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrderWebService} from '../../http/order-web.service';
import {LocalStorageService} from '../../core/local-storage/local-storage.service';
import {Order} from '../../model/order';
import {CustomerWebService} from '../../http/customer-web.service';

describe('EditOrderComponent', () => {
  let component: EditOrderComponent;
  let fixture: ComponentFixture<EditOrderComponent>;
  let orderServiceStub: Partial<OrderWebService>;
  let customerServiceStub: Partial<CustomerWebService>;
  const order = {
    id: '4',
    description: 'bolt'
  } as Order

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FontAwesomeIconsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [EditOrderComponent],
      providers: [
        LocalStorageService,
        NotificationService,
        {
          provide: OrderWebService, useValue: orderServiceStub
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
    fixture = TestBed.createComponent(EditOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
