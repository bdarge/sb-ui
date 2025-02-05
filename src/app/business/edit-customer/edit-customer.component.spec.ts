import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerComponent } from './edit-customer.component';
import { SharedModule} from '../../shared/shared.module';
import { FontAwesomeIconsModule} from '../../shared/font.awesome.icons.module';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule} from '@ngx-translate/core';
import { CustomerComponent} from '../customer/customer.component';
import { NotificationService} from '../../core/notifications/notification.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { LocalStorageService} from '../../core/local-storage/local-storage.service';
import { Customer} from '../../model/customer';
import { CustomerWebService} from '../../http/customer-web.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EditCustomerComponent', () => {
  let component: EditCustomerComponent;
  let fixture: ComponentFixture<EditCustomerComponent>;
  let customerServiceStub: Partial<CustomerWebService>;
  const customer = {
    id: '4',
    name: 'err'
  } as Customer

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [CustomerComponent, EditCustomerComponent],
    imports: [SharedModule,
        FontAwesomeIconsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()],
    providers: [
        {
            provide: LocalStorageService
        },
        {
            provide: NotificationService
        }, {
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
            useValue: { customer }
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
