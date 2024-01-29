import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionWebService } from '../../http/transaction-web.service';
import { TransactionItem } from '../../model/transactionItem';
import { Transaction } from '../../model/transaction';

@Component({
  selector: 'app-edit-transaction-item',
  templateUrl: './edit-transaction-item.component.html',
  styleUrls: ['./edit-transaction-item.component.scss']
})
export class EditTransactionItemComponent implements OnInit {
  form: UntypedFormGroup;
  title: string;
  name: string;
  transactionId: string;

  constructor(
    private orderService: TransactionWebService,
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<EditTransactionItemComponent>,
    @Inject(MAT_DIALOG_DATA) {
      transaction, item
    }: {
      transaction: Transaction, item: TransactionItem
    }) {

    this.title = !item || Object.keys(item).length === 0 ? 'business.transactionItem.add.title' : 'business.transactionItem.edit.title';

    this.name = transaction && transaction.customer ? transaction.customer.name: '';

    this.transactionId = transaction.id;

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
    if(this.form.valid) {
      if (this.form.value.id) {
        return this._update({...this.form.value, transactionId: this.transactionId} as TransactionItem)
      } else {
        return this._create({...this.form.value, transactionId: this.transactionId} as TransactionItem)
      }
    }
  }

  _update (data: TransactionItem) {
    this.orderService.updateItem(data)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  _create (data: TransactionItem) {
    this.orderService.createItem(data)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  close() {
    this.dialogRef.close();
  }

}
