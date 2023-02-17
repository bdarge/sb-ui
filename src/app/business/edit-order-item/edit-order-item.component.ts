import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Order} from '../../model/order';
import {OrderItem} from '../../model/orderItem';
import {OrderWebService} from '../../http/order-web.service';

@Component({
  selector: 'app-edit-order-item',
  templateUrl: './edit-order-item.component.html',
  styleUrls: ['./edit-order-item.component.scss']
})
export class EditOrderItemComponent implements OnInit {
  form: UntypedFormGroup;
  title: string;
  name: string;
  orderId: string;

  constructor(
    private orderService: OrderWebService,
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<EditOrderItemComponent>,
    @Inject(MAT_DIALOG_DATA) {
      order, item
    }: {
      order: Order, item: OrderItem
    }) {

    this.title = Object.keys(item).length === 0 ? 'business.orderItem.add.title' : 'business.orderItem.edit.title';

    this.name = order && order.customer ? order.customer.name: '';

    this.orderId = order.id;

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
      console.log('Dialog output:', this.form.value);
      if (this.form.value.id) {
        return this._update({...this.form.value, orderId: this.orderId})
      } else {
        return this._create({...this.form.value, orderId: this.orderId})
      }
    }
  }

  _update (data) {
    this.orderService.updateItem(data)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  _create (data) {
    this.orderService.createItem(data)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  close() {
    this.dialogRef.close();
  }

}
