import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteComponent } from './quote.component';
import {LocalStorageService} from '../../core/local-storage/local-storage.service';
import {NotificationService} from '../../core/notifications/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeIconsModule} from '../../shared/font.awesome.icons.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {Quote} from '../../model/quote';
import {Page, PageRequest, Query} from '../../model/page';
import {from, Observable} from 'rxjs';
import {QuoteWebService} from '../../http/quote-web.service';

describe('QuotesComponent', () => {
  let component: QuoteComponent;
  let fixture: ComponentFixture<QuoteComponent>;
  let quoteServiceStub: Partial<QuoteWebService>;

  beforeEach(waitForAsync(() => {
    quoteServiceStub = {
      page(request: PageRequest, query: Query): Observable<Page<Quote>> {
        return from(new Promise<Page<Quote>>((resolve, reject) => {
          resolve({
            content: [{
              id: '1',
              description: 'alex'
            } as Quote],
            totalElements: 1,
            size: request.size,
            number: request.page
          } as Page<Quote>)
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
      declarations: [ QuoteComponent ],
      providers: [
        LocalStorageService,
        NotificationService,
        MatDialog,
        {
          provide: QuoteWebService,
          useValue: quoteServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
