import { Component, OnDestroy, OnInit, Self } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  Validator
} from '@angular/forms';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/core.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddressFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AddressFormComponent
    },
  ]
})
export class AddressFormComponent implements OnInit, ControlValueAccessor, OnDestroy, Validator  {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS

  onChangeSubs: Subscription[] = [];

  form = new FormGroup({
    id: new FormControl<string>(''),
    street: new FormControl<string>(''),
    postalCode: new FormControl<string>(''),
    city: new FormControl<string>(''),
    country: new FormControl<string>(''),
    landline: new FormControl<string>(''),
    mobile: new FormControl<string>(''),
  })

  onTouched: Function = () => {};

  ngOnDestroy(): void {
    for (const sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    const sub = this.form.valueChanges.subscribe(fn);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    if (value) {
      this.form.setValue(value, { emitEvent: false });
    }
  }

  setDisabledState(disabled: boolean): void {
    if (disabled) {
      this.form.disable()
    } else {
      this.form.enable();
    }
  }

  validate(control: AbstractControl) {

    if (this.form.valid) {
      return null;
    }

    let errors : any = {};

    errors = this.addControlErrors(errors, 'street');
    errors = this.addControlErrors(errors, 'postalCode');
    errors = this.addControlErrors(errors, 'city');
    errors = this.addControlErrors(errors, 'mobile');
    errors = this.addControlErrors(errors, 'phone');
    return errors;
  }

  addControlErrors(allErrors: any, controlName:string) {

    const errors = {...allErrors};

    const controlErrors = this.form.controls[controlName].errors;

    if (controlErrors) {
      errors[controlName] = controlErrors;
    }

    return errors;
  }
}
