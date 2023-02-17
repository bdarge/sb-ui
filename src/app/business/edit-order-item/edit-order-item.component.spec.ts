import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderItemComponent } from './edit-order-item.component';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeIconsModule} from '../../shared/font.awesome.icons.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {NotificationService} from '../../core/notifications/notification.service';
import {OrderWebService} from '../../http/order-web.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Order} from '../../model/order';
import {CustomerWebService} from '../../http/customer-web.service';

describe('EditOrderItemComponent', () => {
  let component: EditOrderItemComponent;
  let fixture: ComponentFixture<EditOrderItemComponent>;
  let orderServiceStub: Partial<OrderWebService>;
  let customerServiceStub: Partial<CustomerWebService>;
  const model = {
    order: { id: '12', description: 'motor' } as Order,
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
      declarations: [EditOrderItemComponent],
      providers: [
        {
          provide: NotificationService
        },
        {
          provide: OrderWebService, useValue: orderServiceStub
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
    fixture = TestBed.createComponent(EditOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
