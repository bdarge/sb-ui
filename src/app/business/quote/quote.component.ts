import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Observable, of} from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { LocalStorageService, NotificationService, ROUTE_ANIMATIONS_ELEMENTS} from '../../core/core.module';
import { EditQuoteComponent} from '../edit-quote/edit-quote.component';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { UntypedFormControl} from '@angular/forms';
import { Quote } from '../../model/quote';
import { QuoteItem } from '../../model/quoteItem';
import { EditQuoteItemComponent } from '../edit-quote-item/edit-quote-item.component';
import { TableDatasource } from '../../services/table.datasource';
import { Page, Query } from '../../model/page';
import { QuoteWebService } from '../../http/quote-web.service';
import { QuoteViewModel } from '../../model/quoteViewModel';
import { switchMap} from 'rxjs/operators';
import { ItemDatasource } from '../../services/item.datasource';

@Component({
  selector: 'app-quotes',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class QuoteComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('search') search: ElementRef;

  @ViewChild(MatPaginator) orderItemPaginator: MatPaginator;

  @ViewChild(MatSort) orderItemSort: MatSort;

  @ViewChild(MatTable) table: MatTable<any>;

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  title = 'Business X'
  dataSource: TableDatasource<QuoteViewModel, Query>;
  displayedColumns = ['quoteItem', 'quoteNumber', 'customer', 'createdAt', 'edit', 'delete'];
  displayedQuoteItemColumns = ['description', 'unit', 'qty', 'edit', 'delete'];
  expandedElement: any;
  quoteItems: Observable<QuoteItem[]>;
  showDelay = new UntypedFormControl();
  hideDelay = new UntypedFormControl();

  constructor(private quoteService: QuoteWebService,
              private localStorageSvc: LocalStorageService,
              private notificationService: NotificationService,
              private dialog: MatDialog) {
  }

  isExpansionDetailRow = (i: number, row: any) => row.hasOwnProperty('detailRow');

  ngOnInit() {
    this.dataSource = new TableDatasource<QuoteViewModel, Query>(
      (request, query) => this.quoteService.page(request, query)
        .pipe(switchMap((item) => {
          const row = [] as any
          item.content.forEach((order) => {
            const vm = {} as QuoteViewModel
            vm.model = order
            vm.items = new ItemDatasource({id: ''},
              (id) => this.quoteService.getItems(id))
            row.push(vm)
            row.push({detailRow: true, detail: vm})
          })

          return of({
            number: item.number,
            size: item.size,
            totalElements: item.totalElements,
            content: row
          } as Page<QuoteViewModel>)
        })),
      {active: 'id', direction: 'desc'},
      {search: ''}
    )
  }

  /**
   * expand collapse a row
   */
  toggleRow(row) {
    if (this.expandedElement === row) {
      this.expandedElement = null;
    } else {
      this.expandedElement = row;
      console.log('toggle row', row.id)
      row.items.fetch({id: row.model.id})
    }
  }

  edit(quoteViewModel: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = quoteViewModel.model;

    const dialogRef = this.dialog.open(EditQuoteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.dataSource.fetch()
    });
  }

  add() {
    const dialogConfig: MatDialogConfig<any> = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {type: 'QUOTE', quoteSummary: ''} as Quote;

    const dialogRef = this.dialog.open(EditQuoteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.dataSource.fetch()
    });
  }

  editQuoteItem(viewModel: QuoteViewModel, quoteItem: QuoteItem) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      quote: viewModel.model as Quote,
      item: quoteItem ? quoteItem : {
        type: 'QuoteItem'
      } as QuoteItem
    };

    const dialogRef = this.dialog.open(EditQuoteItemComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      viewModel.items.fetch({id: viewModel.model.id})
    });
  }

  deleteQuote(elt: QuoteViewModel) {
    this.quoteService.delete(elt.model)
      .subscribe(() => {
        this.dataSource.fetch()
      });
  }

  deleteQuoteItem(quoteItem: QuoteItem, viewModel: QuoteViewModel) {
    this.quoteService.deleteItem(quoteItem)
      .subscribe(() => {
        console.log(quoteItem);
        viewModel.items.fetch({id: viewModel.model.id})
      });
  }
}

