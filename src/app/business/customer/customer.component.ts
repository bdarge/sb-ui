import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditCustomerComponent} from '../edit-customer/edit-customer.component';
import { Customer} from '../../model/customer';
import { ROUTE_ANIMATIONS_ELEMENTS} from '../../core/core.module';
import { TableDatasource} from '../../services/table.datasource';
import { Query} from '../../model/page';
import { CustomerWebService} from '../../http/customer-web.service';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
    standalone: false
})
export class CustomerComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  ds: TableDatasource<Customer, Query>;
  displayedColumns = ['name', 'email', 'createdAt', 'edit'];

  constructor(private customersService: CustomerWebService,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.ds = new TableDatasource<Customer, Query>(
      (request, query) => this.customersService.page(request, query),
      {active: 'id', direction: 'desc'},
      {search: ''}
    )
  }

  edit(customer: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.autoFocus = true;
    dialogConfig.data = customer || {};
    const dialogRef = this.dialog.open(EditCustomerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.customersService.update(data)
          .subscribe(() => {
            this.ds.fetch()
          });
      }
    });
  }

  add() {
    const dialogConfig: MatDialogConfig<any> = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '600vw';
    dialogConfig.width = '600px';
    dialogConfig.autoFocus = true;
    dialogConfig.data = {} as Customer;
    const dialogRef = this.dialog.open(EditCustomerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.ds.fetch()
    });
  }

  delete(customer: Customer) {
    this.customersService.delete(customer)
      .subscribe(() => {
        this.ds.fetch()
      });
  }
}
