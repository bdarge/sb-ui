import { Component, Inject, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order} from '../../model/order';
import { Customer} from '../../model/customer';
import { ReplaySubject, Subject} from 'rxjs';
import {LocalStorageService, NotificationService} from '../../core/core.module';
import { debounceTime, delay, filter, map, takeUntil, tap} from 'rxjs/operators';
import {OrderWebService} from '../../http/order-web.service';
import {CustomerWebService} from '../../http/customer-web.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  public form: UntypedFormGroup;
  public title: string;
  public currencies = ['USD', 'SEK'];
  public filterCtrl: UntypedFormControl = new UntypedFormControl();
  public searching = false;
  public filteredCustomers: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1)
  private onDestroy: Subject<void>;
  constructor(
    private fb: UntypedFormBuilder,
    private orderService: OrderWebService,
    private customersService: CustomerWebService,
    private notificationService: NotificationService,
    private localStorageSvc: LocalStorageService,
    private dialogRef: MatDialogRef<EditOrderComponent>,
    @Inject(MAT_DIALOG_DATA) {
      id, description, comment, currency, customer, deliveryDate
    }: Order) {

    this.title = id ? 'business.order.edit.title' : 'business.order.add.title';

    this.form = this.fb.group({
      id: [id],
      description: [description, Validators.required],
      customer: [customer, Validators.required],
      comment: [comment],
      currency: [currency],
      deliveryDate: [deliveryDate, Validators.required]
    })

    if(customer) {
      this.filteredCustomers.next([customer])
    }

    this.onDestroy = new Subject<void>();
  }

  ngOnInit() {
    this.filterCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching = true),
        debounceTime(200),
        map(search => this.customersService.filterCustomer({search})),
        delay(500),
        takeUntil(this.onDestroy)
      )
      .subscribe(next => {
        this.searching = false
        next.subscribe(this.filteredCustomers)
      })
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1 && o2 && o1.name === o2.name && o1.id === o2.id;
  }

  save() {
    if(this.form.valid) {
      const user = this.localStorageSvc.getItem('USER');
      if (user) {
        this.form.value.user = user;
      }

      if(this.form.value.id) {
        this._edit()
      } else {
        this._add()
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  _add() {
    this.orderService.add(this.form.value as Order)
      .subscribe(() => {
        this.dialogRef.close()
      }, (err) => {
        this.notificationService.error(err && err.message ? err.message : 'Failed to save order. ' + err);
      });
  }

  _edit() {
    this.orderService.update(this.form.value as Order)
      .subscribe(() => {
        this.dialogRef.close()
      }, (err) => {
        this.notificationService.error(err && err.message ? err.message : 'Failed to save order. ' + err);
      });
  }
}
