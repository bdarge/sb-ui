import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Observable, of} from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LocalStorageService, ROUTE_ANIMATIONS_ELEMENTS } from '../../core/core.module';
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
import { SettingsState, State } from 'app/core/settings/settings.model';
import { selectSettings } from '../../core/settings/settings.selectors';
import { Store, select } from '@ngrx/store';
import { getCurrencySymbol } from '@angular/common';
import { constant } from 'cypress/types/lodash';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    standalone: false
})
export class TransactionComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  title = 'Business X'
  dataSource: TableDatasource<IModel, Query>;
  displayedColumns = [ 'transactionNumber', 'customer', 'createdAt', 'edit', 'delete', 'transactionItem'];
  displayedItemColumns = ['description', 'unit', 'unitPrice', 'qty', 'delete'];
  expandedElement: any;
  showDelay = new UntypedFormControl();
  hideDelay = new UntypedFormControl();
  pageSizeOptions = [3, 5, 10];
  setting$: Observable<SettingsState>;
  currencies = [];

  constructor(private transactionWebService: TransactionWebService,
              private localStorageSvc: LocalStorageService,
              private dialog: MatDialog,
              private ref: ChangeDetectorRef,
              private store: Store<State>) {
  }

  ngOnInit() {
    this.dataSource = new TableDatasource<TransactionViewModel, TranQuery>(
      (request, query) => this.transactionWebService.page(request, query)
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
    );
    this.setting$ = this.store.pipe(select(selectSettings));
    const lst = this.localStorageSvc.getItem('LANGUAGES');
    lst.map((l) => {
      this.currencies.push({
        value: l.currency, label: l.currency.toUpperCase()
      })
    });
  }

  /**
   * toggle a row's visibility
   */
  toggleRow(row: TransactionViewModel, event: Event) {
    this.expandedElement = this.expandedElement === row ? null: row
    event.stopPropagation();
  }

  edit(viewModel: TransactionViewModel) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = viewModel.model;
    // console.log(viewModel);
    const dialogRef = this.dialog.open(EditTransactionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.dataSource.fetch();
    });
  }

  add() {
    const dialogConfig: MatDialogConfig<any> = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    let st: State
    this.store.subscribe(s => st = s);
    let currency = 'usd';
    if (st) {
      currency = st.settings.currency;
    }
    dialogConfig.data = { currency } as Transaction;

    const dialogRef = this.dialog.open(EditTransactionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.dataSource.fetch();
    });
  }

  editItem(tranViewModel: TransactionViewModel,  item: TransactionItem) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      transaction: tranViewModel.model as Transaction,
      item: item || {transactionId: tranViewModel.model.id} as TransactionItem
    };

    const dialogRef = this.dialog.open(EditTransactionItemComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this._refreshItem(tranViewModel);
    });
  }

  deleteTransaction(elt: TransactionViewModel) {
    this.transactionWebService.delete(elt.model)
      .subscribe(() => {
        this.dataSource.fetch();
      });
  }

  deleteItem(tranViewModel: TransactionViewModel, item: TransactionItem) {
    this.transactionWebService.deleteItem(item)
      .subscribe(() => {
        this._refreshItem(tranViewModel);
      })
  }

  _refreshItem(tranViewModel: TransactionViewModel) {
    this.transactionWebService.getItems(tranViewModel.model.id)
      .subscribe((result) => {
        if (result.data) {
          tranViewModel.model.items = result.data.sort((a,b) => a.id - b.id);
        }
        this.ref.detectChanges();
      });
  }

  currencySymbol(currency: string) {
    return getCurrencySymbol(currency.toUpperCase(), 'narrow');
  }
}
