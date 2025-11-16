import { Component } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/animations/route.animations';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ConfigWebService } from '../../http/config-web.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { LocalStorageService } from '../../core/local-storage/local-storage.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Account } from '../../model/account';
import { Address } from '../../model/user';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss'],
  standalone: false,
})
export class AboutmeComponent {
  businessForm = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    address: {
      id: [''],
      street: [''],
      postalCode: [''],
      city: [''],
      country: [''],
      landline: [''],
      mobile: [''],
    },
    hourlyRate: [''],
    vat: [''],
  });

  protected readonly routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(
    private fb: UntypedFormBuilder,
    private configService: ConfigWebService,
    private notificationService: NotificationService,
    private localStorageSvc: LocalStorageService
  ) {}

  ngOnInit() {
    const acct = this.localStorageSvc.getItem('ACCOUNT') as Account;
    this.configService.getBusiness(acct.businessId).subscribe((data) => {
      if (!acct.roles.includes('admin')) {
        this.businessForm.disable({ onlySelf: true });
      }

      const d = {
        id: data.id,
        name: data.name,
        vat: data.vat,
        hourlyRate: data.hourlyRate,
        address: {
          id: data.id,
          landline: data.landline,
          street: data.street,
          city: data.city,
          postalCode: data.postalCode,
          country: data.country,
          mobile: data.mobile || '',
        } as Address,
      };

      this.businessForm.patchValue(d);

      this.businessForm.valueChanges
        .pipe(
          debounceTime(1000),
          distinctUntilChanged(
            (a, b) => JSON.stringify(a) === JSON.stringify(b)
          )
        )
        .subscribe((f) => {
          this.save();
        });
    });
  }

  save() {
    if (this.businessForm.valid) {
      const m = {
        ...this.businessForm.value,
        ...this.businessForm.value.address,
      };
      delete m.address;
      this.configService.saveBusiness(m).subscribe({
        next: (business) => {
          if (business) {
            this.businessForm.patchValue(business, { emitEvent: false });
            this.notificationService.info('saved');
          }
        },
        error: (err) => {
          this.notificationService.error(
            err ? err.message : 'failed to save. ' + err
          );
        },
      });
    } else {
      this.validateAll(this.businessForm);
      this.notificationService.error('form is invalid.');
    }
  }

  validateAll(businessForm) {
    Object.keys(businessForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.businessForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
            controlErrors[keyError]
          );
        });
      }

      const control = this.businessForm.get(key);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAll(control);
      }
    });
  }
}
