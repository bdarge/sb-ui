import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../model/customer';
import { ReplaySubject, Subject } from "rxjs";
import { LocalStorageService, NotificationService } from '../../core/core.module';
import { debounceTime, delay, filter, map, takeUntil, tap } from "rxjs/operators";
import { TransactionWebService } from '../../http/transaction-web.service';
import { CustomerWebService } from '../../http/customer-web.service';
import { Transaction } from "../../model/transaction";

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss']
})
export class EditTransactionComponent implements OnInit {
  public form: UntypedFormGroup;
  public title: string;
  public customer: Customer;
  public currencies = ['USD', 'SEK'];
  public tranTypes = ['order', 'quote'];
  public customerSearchCtrl: FormControl<string> = new FormControl<string>('')
  public searching = false;
  public filteredCustomers: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1)
  private onDestroy: Subject<void>;

  constructor(
    private fb: UntypedFormBuilder,
    private tranService: TransactionWebService,
    private customersService: CustomerWebService,
    private notificationService: NotificationService,
    private localStorageSvc: LocalStorageService,
    private dialogRef: MatDialogRef<EditTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) {
      id, description, type, currency, customer, deliveryDate
    }: Transaction) {

    this.customer = customer;

    this.title = id ? 'business.transaction.edit.title' : 'business.transaction.add.title';

    this.form = this.fb.group({
      id: [id],
      description: [description, Validators.required],
      customer: [customer, Validators.required],
      type: [type, Validators.required],
      currency: [currency],
      deliveryDate: [deliveryDate, Validators.required]
    })

    if(customer) {
      this.filteredCustomers.next([customer])
    }

    this.onDestroy = new Subject<void>();
  }

  ngOnInit() {
    this.customerSearchCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching = true),
        debounceTime(200),
        map(search => {
         return this.customersService.get({ search })
            .pipe(map(d => {
              if (!d.data) {
                return [];
              }
              return d.data;
            }))
        }),
        delay(500),
        takeUntil(this.onDestroy)
      )
      .subscribe(next => {
        this.searching = false;
        next.subscribe(e => this.filteredCustomers.next(e))
      }, error => {
        this.searching = false;
        // handle error...
        this.notificationService.error(error && error.message ? error.message : 'Failed to load customers. ' + error);
      });
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
    this.tranService.add(this.form.value as Transaction)
      .subscribe(() => {
        this.dialogRef.close()
      }, (err) => {
        this.notificationService.error(err && err.message ? err.message : 'Failed to save transaction. ' + err);
      });
  }

  _edit() {
    this.tranService.update(this.form.value as Transaction)
      .subscribe(() => {
        this.dialogRef.close()
      }, (err) => {
        this.notificationService.error(err && err.message ? err.message : 'Failed to save transaction. ' + err);
      });
  }
}
