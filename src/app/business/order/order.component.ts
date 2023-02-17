import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable, of} from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { LocalStorageService, NotificationService, ROUTE_ANIMATIONS_ELEMENTS} from '../../core/core.module';
import { Order} from '../../model/order';
import { EditOrderComponent} from '../edit-order/edit-order.component';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { OrderItem} from '../../model/orderItem';
import { EditOrderItemComponent} from '../edit-order-item/edit-order-item.component';
import { UntypedFormControl} from '@angular/forms';
import {TableDatasource} from '../../services/table.datasource';
import {Page, Query} from '../../model/page';
import {OrderWebService} from '../../http/order-web.service';
import {IViewModel, OrderViewModel} from '../../model/orderViewModel';
import {ItemDatasource} from '../../services/item.datasource';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class OrderComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('search') search: ElementRef;

  @ViewChild(MatPaginator) orderItemPaginator: MatPaginator;

  @ViewChild(MatSort) orderItemSort: MatSort;

  @ViewChild(MatTable) table: MatTable<any>;

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  title = 'Business X'
  dataSource: TableDatasource<IViewModel, Query>;
  displayedColumns = ['orderItem', 'purchaseOrderNumber', 'customer', 'createdAt', 'edit', 'delete'];
  displayedOrderItemColumns = ['description', 'unit', 'unitPrice', 'qty', 'edit', 'delete'];
  expandedElement: any;
  orderItems: Observable<OrderItem[]>;
  showDelay = new UntypedFormControl();
  hideDelay = new UntypedFormControl();

  constructor(private orderService: OrderWebService,
              private localStorageSvc: LocalStorageService,
              private notificationService: NotificationService,
              private dialog: MatDialog) {
  }

  isExpansionDetailRow = (i: number, row: any) => row.hasOwnProperty('detailRow')

  ngOnInit() {
    this.dataSource = new TableDatasource<OrderViewModel, Query>(
      (request, query) => this.orderService.page(request, query)
        .pipe(switchMap((item) => {
          const row = [] as any
          item.content.forEach((order) => {
            const vm = {} as OrderViewModel
            vm.model = order
            vm.items = new ItemDatasource({id: ''},
              (id) => this.orderService.getItems(id))
            row.push(vm)
            row.push({detailRow: true, detail: vm})
          })

          return of({
            number: item.number,
            size: item.size,
            totalElements: item.totalElements,
            content: row
          } as Page<OrderViewModel>)
        })),
      {active: 'id', direction: 'desc'},
      {search: ''}
    )
  }

  /**
   * expand collapse a row
   */
  toggleRow(row) {
    console.log('toggle row ....');
    if (this.expandedElement === row) {
      this.expandedElement = null;
    } else {
      this.expandedElement = row
      row.items.fetch({id: row.model.id})
    }
  }

  edit(orderViewModel: any) {
    console.log('edit => ', orderViewModel)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = orderViewModel.model;

    const dialogRef = this.dialog.open(EditOrderComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.dataSource.fetch()
    });
  }

  add() {
    const dialogConfig: MatDialogConfig<any> = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {type: 'INVOICE', currency: 'USD'} as Order;

    const dialogRef = this.dialog.open(EditOrderComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.dataSource.fetch()
    });
  }

  editOrderItem(orderViewModel: OrderViewModel, orderItem: OrderItem) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      order: orderViewModel.model as Order,
      item: orderItem ? orderItem : {
        type: 'OrderItem'
      } as OrderItem
    };

    const dialogRef = this.dialog.open(EditOrderItemComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      orderViewModel.items.fetch({id: orderViewModel.model.id})
    });
  }

  deleteOrder(elt: OrderViewModel) {
    this.orderService.delete(elt.model)
      .subscribe(() => {
        this.dataSource.fetch()
      });
  }

  deleteOrderItem(orderViewModel: OrderViewModel, orderItem: OrderItem) {
    this.orderService.deleteItem(orderItem)
      .subscribe(() => {
        console.log('deleteOrderItem');
        console.log(orderItem);
        orderViewModel.items.fetch({id: orderViewModel.model.id})
      })
  }
}
