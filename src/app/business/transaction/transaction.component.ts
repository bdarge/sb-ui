import { Component, OnInit } from '@angular/core';
import { Observable, of} from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LocalStorageService, NotificationService, ROUTE_ANIMATIONS_ELEMENTS } from '../../core/core.module';
import { EditTransactionComponent } from '../edit-transaction/edit-transaction.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EditTransactionItemComponent } from '../edit-transaction-item/edit-transaction-item.component';
import { UntypedFormControl } from '@angular/forms';
import { TableDatasource } from '../../services/table.datasource';
import { Page, Query } from '../../model/page';
import { TransactionWebService } from '../../http/transaction-web.service';
import { IModel, TransactionViewModel } from '../../model/transactionViewModel';
import { switchMap} from 'rxjs/operators';
import { TranQuery, Transaction } from '../../model/transaction';
import { TransactionItem } from '../../model/transactionItem';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TransactionComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  title = 'Business X'
  dataSource: TableDatasource<IModel, Query>;
  displayedColumns = [ 'transactionNumber', 'customer', 'createdAt', 'edit', 'delete', 'transactionItem'];
  displayedItemColumns = ['description', 'unit', 'unitPrice', 'qty', 'edit', 'delete'];
  expandedElement: any;
  transactionItems: Observable<TransactionItem[]>;
  showDelay = new UntypedFormControl();
  hideDelay = new UntypedFormControl();
  pageSizeOptions = [3, 5, 10];

  constructor(private tService: TransactionWebService,
              private localStorageSvc: LocalStorageService,
              private notificationService: NotificationService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new TableDatasource<TransactionViewModel, TranQuery>(
      (request, query) => this.tService.page(request, query)
        .pipe(switchMap((item) => {
          const row: TransactionViewModel[] = []
          if (item.data) {
            item.data.forEach((t) => {
              const vm = {} as TransactionViewModel
              vm.model = t
              row.push(vm)
            })
          }
          return of({
            page: item.page,
            limit: item.limit,
            total: item.total,
            data: row
          } as Page<TransactionViewModel>)
        })),
      {active: 'id', direction: 'desc'},
      {search: '', requestType: ''}
    )
  }

  /**
   * expand or collapse a row
   */
  toggleRow(row: TransactionViewModel, event: Event) {
    this.expandedElement = this.expandedElement === row ? null: row
    event.stopPropagation()
  }

  edit(viewModel: TransactionViewModel) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = viewModel.model;

    const dialogRef = this.dialog.open(EditTransactionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.dataSource.fetch()
    });
  }

  add() {
    const dialogConfig: MatDialogConfig<any> = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = { currency: 'USD' } as Transaction;

    const dialogRef = this.dialog.open(EditTransactionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.dataSource.fetch()
    });
  }

  editItem(tranViewModel: TransactionViewModel,  item: TransactionItem) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      order: tranViewModel.model as Transaction,
      item: item as TransactionItem
    };

    const dialogRef = this.dialog.open(EditTransactionItemComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(() => {
    //   tranViewModel.items.fetch({id: tranViewModel.model.id})
    // });
  }

  deleteOrder(elt: TransactionViewModel) {

    this.tService.delete(elt.model)
      .subscribe(() => {
        this.dataSource.fetch()
      });
  }

  deleteItem(tranViewModel: TransactionViewModel, orderItem: TransactionItem) {
    // this.tService.deleteItem(orderItem)
    //   .subscribe(() => {
    //     console.log('deleteOrderItem');
    //     console.log(orderItem);
    //     tranViewModel.items.fetch({id: tranViewModel.model.id})
    //   })
  }
}
