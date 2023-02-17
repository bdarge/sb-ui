import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuoteItemComponent } from './edit-quote-item.component';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeIconsModule} from '../../shared/font.awesome.icons.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {NotificationService} from '../../core/notifications/notification.service';
import {QuoteWebService} from '../../http/quote-web.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Quote} from '../../model/quote';
import {Customer} from '../../model/customer';
import {CustomerWebService} from '../../http/customer-web.service';

describe('EditQuoteItemComponent', () => {
  let component: EditQuoteItemComponent;
  let fixture: ComponentFixture<EditQuoteItemComponent>;
  let quoteServiceStub: Partial<QuoteWebService>;
  let customerServiceStub: Partial<CustomerWebService>;

  const model = {
    quote: {
      id: '12', description: 'motor', customer: {
        name: 'Jhon'
      } as Customer
    } as Quote,
    item: {id: '2', quoteId: '12', description: 'bolt'} as any
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
      declarations: [EditQuoteItemComponent],
      providers: [
        {
          provide: NotificationService
        },
        {
          provide: QuoteWebService, useValue: quoteServiceStub
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
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuoteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
