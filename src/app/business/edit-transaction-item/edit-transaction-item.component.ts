import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionWebService } from '../../http/transaction-web.service';
import { TransactionItem } from '../../model/transactionItem';
import { Transaction } from '../../model/transaction';
import { LocalStorageService } from '../../core/core.module';
import { Language } from '../../model/user';

@Component({
    selector: 'app-edit-transaction-item',
    templateUrl: './edit-transaction-item.component.html',
    styleUrls: ['./edit-transaction-item.component.scss'],
    standalone: false
})
export class EditTransactionItemComponent implements OnInit {
  form: UntypedFormGroup;
  title: string;
  name: string;
  transactionId: number;
  locale: string;
  transaction: Transaction;
  currencies = [];
  convertedCurrency: string = null;

  constructor(
    private transactionService: TransactionWebService,
    private fb: UntypedFormBuilder,
    private localStorageSvc: LocalStorageService,
    private dialogRef: MatDialogRef<EditTransactionItemComponent>,
    @Inject(MAT_DIALOG_DATA) {
      transaction, item
    }: {
      transaction: Transaction, item: TransactionItem
    }) {

    this.title = !item || Object.keys(item).length === 0 ? 'business.transactionItem.add.title' : 'business.transactionItem.edit.title';
    this.name = transaction && transaction.customer ? transaction.customer.name : '';
    this.transactionId = transaction.id;
    this.transaction = transaction;

    this.form = this.fb.group({
      id: [item.id],
      description: [item.description, Validators.required],
      unit: [item.unit],
      unitPrice: [item.unitPrice, Validators.required],
      qty: [item.qty, Validators.required]
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

  getLanguage(locale: string): Language {
    const lst: Language[]  = this.localStorageSvc.getItem('LANGUAGES');
    return lst.find(l => l.locale === locale);
  }
}
