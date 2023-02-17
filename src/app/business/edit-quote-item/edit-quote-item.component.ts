import { Component, Inject, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Quote} from '../../model/quote';
import { QuoteItem} from '../../model/quoteItem';
import { QuoteWebService} from '../../http/quote-web.service';

@Component({
  selector: 'app-edit-quote-item',
  templateUrl: './edit-quote-item.component.html',
  styleUrls: ['./edit-quote-item.component.scss']
})
export class EditQuoteItemComponent implements OnInit {
  form: UntypedFormGroup;
  title: string;
  name: string;
  quoteId: string;

  constructor(
    private quoteService: QuoteWebService,
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<EditQuoteItemComponent>,
    @Inject(MAT_DIALOG_DATA) {
      quote, item
    }: {
      quote: Quote, item: QuoteItem
    }) {

    this.title = Object.keys(item).length === 0 ? 'business.quoteItem.add.title' : 'business.quoteItem.edit.title';
    this.quoteId = quote.id;
    this.name = quote && quote.customer ? quote.customer.name: '';
    this.form = this.fb.group({
      id: [item.id],
      quote: [quote],
      description: [item.description, Validators.required],
      unit: [item.unit],
      unitPrice: [item.unitPrice, Validators.required],
      qty: [item.qty, Validators.required]
    });
  }

  ngOnInit() {}

  save() {
    if(this.form.valid) {
      console.log('Dialog output:', this.form.value);
      if (this.form.value.id) {
        return this._update(this.form.value)
      } else {
        return this._create(this.form.value)
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  _update (data) {
    this.quoteService.updateItem(data)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  _create (data) {
    this.quoteService.createItem(data)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

}
