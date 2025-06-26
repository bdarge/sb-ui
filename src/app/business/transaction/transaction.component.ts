import { Component, OnInit, ChangeDetectorRef, signal, effect, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
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
import { switchMap } from 'rxjs/operators';
import { TranQuery, Transaction } from '../../model/transaction';
import { Currency, CurrencyRequest, TransactionItem } from '../../model/transactionItem';
import { SettingsState, State } from 'app/core/settings/settings.model';
import { selectSettings } from '../../core/settings/settings.selectors';
import { Store, select } from '@ngrx/store';
import { Language } from 'app/model/user';
import { DataSignalService } from 'app/services/data-signal.service';
import { SbService } from 'app/http/sb.service';
import { toObservable } from '@angular/core/rxjs-interop';


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
  displayedColumns = ['transactionNumber', 'customer', 'createdAt', 'edit', 'delete', 'transactionItem'];
  displayedItemColumns = ['description', 'unit', 'unitPrice', 'qty', 'delete'];
  expandedElement: any;
  position = new UntypedFormControl("below");
  pageSizeOptions = [3, 5, 10];
  setting$: Observable<SettingsState>;
  currencies = [];
  currencyId = null;
  previousCurrencyId = null;
  currency = toObservable(this.signalSrv.currency);

  constructor(private transactionWebService: TransactionWebService,
    private localStorageSvc: LocalStorageService,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private store: Store<State>,
    private signalSrv: DataSignalService,
    private notificationSrv: NotificationService,
    private sbSvc: SbService) {
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
      { active: 'id', direction: 'desc' },
      { search: '', requestType: '' }
    );
    this.setting$ = this.store.pipe(select(selectSettings));
    const lst = this.localStorageSvc.getItem('LANGUAGES');
    lst.forEach((l) => {
      this.currencies.push({
        value: l.currency, label: l.currency.toUpperCase()
      })
    });
  }

  /** Checks whether an element is expanded. */
  isExpanded(element: TransactionViewModel) {
    return this.expandedElement === element;
  }

  /**
   * toggle a row's visibility
   */
  toggle(element: TransactionViewModel) {
    this.expandedElement = this.isExpanded(element) ? null : element;
    if (this.expandedElement == null) {
      this.currencyId = null
      return
    }
    this.currencyId = element.model.currency.toLowerCase()
    this.signalSrv.currency.set(
      { to: this.currencyId, value: 1, base: this.currencyId } as Currency
    );
  }

  edit(viewModel: TransactionViewModel) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = viewModel.model;
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

  editItem(tranViewModel: TransactionViewModel, item: TransactionItem) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      transaction: tranViewModel.model as Transaction,
      item: item || { transactionId: tranViewModel.model.id } as TransactionItem
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
          tranViewModel.model.items = result.data.sort((a, b) => a.id - b.id);
        }
        this.ref.detectChanges();
      });
  }

  getLanguage(currency: string): Language {
    const lst: Language[] = this.localStorageSvc.getItem('LANGUAGES');
    return lst.find(l => l.currency == currency);
  }

  currencyChanged(toCurrency: string) {
    this.previousCurrencyId = this.currencyId;
    this.currencyId = toCurrency

    const present = this.getLanguage(this.previousCurrencyId || this.expandedElement.model.currency.toLocaleLowerCase())
    if (toCurrency == null || this.previousCurrencyId == null) {
      return
    }
    const base = present.currency.toUpperCase();
    const selected = this.getLanguage(toCurrency);
    const req = {
      'symbol': selected.currency.toUpperCase(),
      'base': base
    } as CurrencyRequest

    this.sbSvc.convert(req).subscribe({
      next: (response) => {
        if (response) {
          this.signalSrv.currency.set(
            { to: selected.currency, value: response.value.valueOf(), base: present.currency } as Currency
          );
        }
      }, error: (err) => {
        this.notificationSrv.error(`Failed to convert to ${toCurrency.toUpperCase()}`);
        this.currencyId = this.previousCurrencyId;
      }
    });
  }
}
