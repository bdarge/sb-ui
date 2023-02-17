import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditQuoteComponent } from './edit-quote.component';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeIconsModule} from '../../shared/font.awesome.icons.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {NotificationService} from '../../core/notifications/notification.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {QuoteWebService} from '../../http/quote-web.service';
import {LocalStorageService} from '../../core/local-storage/local-storage.service';
import {Quote} from '../../model/quote';
import {CustomerWebService} from '../../http/customer-web.service';

describe('EditQuoteComponent', () => {
  let component: EditQuoteComponent;
  let fixture: ComponentFixture<EditQuoteComponent>;
  let quoteServiceStub: Partial<QuoteWebService>;
  let customerServiceStub: Partial<CustomerWebService>;
  const quote = {
    id: '4',
    description: 'bolt'
  } as Quote

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FontAwesomeIconsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),

      ],
      declarations: [EditQuoteComponent],
      providers: [
        {
          provide: LocalStorageService
        },
        {
          provide: NotificationService
        }, {
          provide: QuoteWebService, useValue: quoteServiceStub
        }, {
          provide: CustomerWebService, useValue: customerServiceStub
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {quote}
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
