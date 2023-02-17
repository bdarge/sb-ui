import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {Customer} from '../../model/customer';
import {LocalStorageService} from '../../core/local-storage/local-storage.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService, ROUTE_ANIMATIONS_ELEMENTS} from '../../core/core.module';
import {MatSnackBar } from '@angular/material/snack-bar';
import {Quote} from '../../model/quote';
import {QuoteSummary} from '../../model/quoteSummary';
import {debounceTime, delay, filter, map, takeUntil, tap} from 'rxjs/operators';
import {QuoteWebService} from '../../http/quote-web.service';
import {CustomerWebService} from '../../http/customer-web.service';

@Component({
  selector: 'app-edit-quote',
  templateUrl: './edit-quote.component.html',
  styleUrls: ['./edit-quote.component.scss']
})
export class EditQuoteComponent implements OnInit {
  form: UntypedFormGroup;
  title: string;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  currencies = ['USD', 'SEK'];
  public filterCtrl: UntypedFormControl = new UntypedFormControl();
  public searching = false;
  public filteredCustomers: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1)
  private _onDestroy = new Subject<void>()

  constructor(
    private fb: UntypedFormBuilder,
    public snackBar: MatSnackBar,
    private customersService: CustomerWebService,
    private quoteService: QuoteWebService,
    private notificationService: NotificationService,
    private localStorageSvc: LocalStorageService,
    private dialogRef: MatDialogRef<EditQuoteComponent>,
    @Inject(MAT_DIALOG_DATA) {
      id, description,
      customer,
      quoteSummary
    }: Quote) {

    this.title = id ? 'business.quote.edit.title' : 'business.quote.add.title';

    this.form = this.fb.group({
      id: [id],
      description: [description, Validators.required],
      customer: [customer, Validators.required],
      quoteSummary: [quoteSummary]
    })

    if(customer) {
      this.filteredCustomers.next([customer])
    }
  }

  get quoteDetails (){
    return this.form.get('quoteDetails') as UntypedFormArray;
  }

  get quoteSummary (){
    return this.form.get('quoteSummary') as UntypedFormArray;
  }

  createQuoteDetail(quoteDetails): UntypedFormGroup[] {
    return quoteDetails.map(q => this.fb.group(q));
  }

  createQuoteSummary(quoteSummary: QuoteSummary[]) {
    return quoteSummary.map(q => this.fb.group(q));
  }

  ngOnInit() {
    this.filterCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching = true),
        debounceTime(200),
        map(search => this.customersService.filterCustomer({search})),
        delay(500),
        takeUntil(this._onDestroy)
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

  _add() {
    this.quoteService.add(this.form.value)
      .subscribe(() => {
        this.dialogRef.close()
      }, (err) => {
        this.notificationService.error(err && err.message ? err.message : 'Failed to save order. ' + err);
      });
  }

  _edit() {
    this.quoteService.update(this.form.value)
      .subscribe(() => {
        this.dialogRef.close()
      }, (err) => {
        this.notificationService.error(err && err.message ? err.message : 'Failed to save order. ' + err);
      });
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
