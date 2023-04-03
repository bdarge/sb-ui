import { Component, Inject, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer} from '../../model/customer';
import { NotificationService} from '../../core/core.module';
import { CustomerWebService} from '../../http/customer-web.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  form: UntypedFormGroup;
  title: string;
  orgName: string;

  constructor(
    private notificationService: NotificationService,
    private customersService: CustomerWebService,
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<EditCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) {
      id, name, postalCode, street, city, country, email, phone
    }: Customer) {

    this.title = id ? 'business.customer.edit.title' : 'business.customer.add.title';

    this.form = this.fb.group({
      id: [id],
      name: [name, Validators.required],
      postalCode: [postalCode],
      street: [street],
      city: [city],
      country: [country],
      email: [email, Validators.required],
      phone: [phone]
    });
  }

  ngOnInit() {}

  save() {
    if (this.form.valid) {
      if(this.form.value.id) {
        this._edit()
      } else {
        this._add()
      }
    } else {
      this.validateAllFormControl(this.form);
      this.notificationService.error('form is invalid.');
    }
  }

  close() {
    this.dialogRef.close();
  }

  validateAllFormControl(form) {
    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }

      const control = this.form.get(key);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormControl(control);
      }
    });
  }

  private _edit() {
    this.customersService.update(this.form.value)
      .subscribe(() => {
        console.log('updated ...')
        this.dialogRef.close(this.form.value);
      });
  }

  private _add() {
    this.customersService.add(this.form.value)
      .subscribe(() => {
        console.log('inserted ...')
        this.dialogRef.close(this.form.value);
      });
  }
}
