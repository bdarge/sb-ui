import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CustomerComponent} from './customer.component';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatDialogHarness} from '@angular/material/dialog/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {EditCustomerComponent} from '../edit-customer/edit-customer.component';
import {NotificationService} from '../../core/notifications/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PageRequest, Page, Query} from '../../model/page';
import {from, Observable, of} from 'rxjs';
import {Customer} from '../../model/customer';
import { FontAwesomeIconsModule } from 'app/shared/font.awesome.icons.module';
import {CustomerWebService} from '../../http/customer-web.service';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let customerService: CustomerWebService;
  let loader: HarnessLoader;
  let rootLoader: HarnessLoader;
  let customerServiceStub: Partial<CustomerWebService>;

  const getAddButton = async () => loader.getHarness<MatButtonHarness>(MatButtonHarness);

  const getDialog = async () =>  rootLoader.getHarness<MatDialogHarness>(MatDialogHarness);

  beforeEach(waitForAsync(() => {
    customerServiceStub = {
      page(request: PageRequest, query: Query): Observable<Page<Customer>> {
        return from(new Promise<Page<Customer>>((resolve, reject) => {
          resolve({
            data: [{
              id: '1',
              name: 'alex'
            } as Customer],
            total: 1,
            limit: request.size,
            page: request.page
          } as Page<Customer>)
        }))
      }
    };

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FontAwesomeIconsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [CustomerComponent, EditCustomerComponent],
      providers: [
        {
          provide: NotificationService
        }, {
          provide: CustomerWebService, useValue: customerServiceStub
        }, {
          provide: MatDialog
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // CustomerService from the root injector
    customerService = TestBed.inject(CustomerWebService);

    loader = TestbedHarnessEnvironment.loader(fixture);
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add button available', async () => {
    fixture.detectChanges();
    const removeDoneTodosButton = await getAddButton();
    expect(removeDoneTodosButton).toBeTruthy();
  });

  it('should open a dialog when add button clicked', async () => {
    fixture.detectChanges();
    const addButton = await getAddButton();
    await addButton.click();
    const dialogHarness = await getDialog();
    const dialogs = await rootLoader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);
    expect(dialogHarness).toBeTruthy();
    await dialogHarness.close()
  });

  it('should open a dialog when edit button clicked', async () => {
      const editButton = await loader.getHarness(MatButtonHarness.with({selector: 'button[aria-label=edit]'}));
      await editButton.click()
      const dialogHarness = await getDialog();
      const dialogs = await rootLoader.getAllHarnesses(MatDialogHarness);
      expect(dialogs.length).toBe(1);
      expect(dialogHarness).toBeTruthy();
      await dialogHarness.close();
    });
});
