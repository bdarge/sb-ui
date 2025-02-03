import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionWebService } from '../../http/transaction-web.service';
import { CurrencyRequest, TransactionItem } from '../../model/transactionItem';
import { Transaction } from '../../model/transaction';
import { LocalStorageService } from '../../core/core.module';
import { SbService } from 'app/http/sb.service';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-edit-transaction-item',
  templateUrl: './edit-transaction-item.component.html',
  styleUrls: ['./edit-transaction-item.component.scss']
})
export class EditTransactionItemComponent implements OnInit {
  form: UntypedFormGroup;
  title: string;
  name: string;
  transactionId: number;
  currency: string;
  transaction: Transaction;
  currencies = [];
  convertedCurrency: Number = null;

  constructor(
    private transactionService: TransactionWebService,
    private fb: UntypedFormBuilder,
    private localStorageSvc: LocalStorageService,
    private dialogRef: MatDialogRef<EditTransactionItemComponent>,
    private sbSvc: SbService,
    @Inject(MAT_DIALOG_DATA) {
      transaction, item
    }: {
      transaction: Transaction, item: TransactionItem
    }) {

    this.title = !item || Object.keys(item).length === 0 ? 'business.transactionItem.add.title' : 'business.transactionItem.edit.title';
    this.name = transaction && transaction.customer ? transaction.customer.name : '';
    this.transactionId = transaction.id;
    this.currency = transaction.currency;
    this.transaction = transaction;

    this.form = this.fb.group({
      id: [item.id],
      description: [item.description, Validators.required],
      unit: [item.unit],
      unitPrice: [item.unitPrice, Validators.required],
      qty: [item.qty, Validators.required]
    });

    const lst = this.localStorageSvc.getItem('LANGUAGES');
    lst.map((l) => {
      this.currencies.push({
        value: l.currency, label: l.currency.toUpperCase()
      })
    });
  }

  ngOnInit() {
  }

  save() {
    if (this.form.valid) {
      if (this.form.value.id) {
        return this._update({ ...this.form.value, transactionId: this.transactionId } as TransactionItem)
      } else {
        return this._create({ ...this.form.value, transactionId: this.transactionId } as TransactionItem)
      }
    }
  }

  _update(data: TransactionItem) {
    this.transactionService.updateItem(data)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  _create(data: TransactionItem) {
    this.transactionService.createItem(data)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  close() {
    this.dialogRef.close();
  }

  priceChanged() {
    this.currencyChange();
  }

  currencyChange() {
    if (this.currency === this.transaction.currency) {
      return;
    }
    const req = {
      'symbol': this.currency.toUpperCase(),
      'base': this.transaction.currency.toUpperCase()
    } as CurrencyRequest

    this.sbSvc.convert(req).subscribe(
      {
        next: (response) => {
          if (response && response.value) {
            const v = Math.round((response.value.valueOf() * this.form.get('unitPrice').value + Number.EPSILON) * 100) / 100
            this.convertedCurrency = v;
          }
        },
        error: (e) => {
          // do nothing
        }
      })
  }

  currencySymbol(currency: string) {
    return getCurrencySymbol(currency, 'narrow').toUpperCase();
  }
}
