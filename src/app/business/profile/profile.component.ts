import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators} from '@angular/forms';
import {LocalStorageService, NotificationService, ROUTE_ANIMATIONS_ELEMENTS} from '../../core/core.module';
import {ConfigWebService} from '../../http/config-web.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS
  form = this.fb.group({
    id: [''],
    businessName: [''],
    username: ['', [Validators.required]],
    street: ['',],
    postalCode: [''],
    hourlyRate: [''],
    city: ['', ],
    country: ['', ],
    landLinePhone: [''],
    mobilePhone: [''],
    vat: ['']
  })

  constructor(private fb: UntypedFormBuilder,
              private configService: ConfigWebService,
              private notificationService: NotificationService,
              private localStorageSvc: LocalStorageService) {

  }

  ngOnInit() {
    const acct = this.localStorageSvc.getItem('USER')
    console.log(acct)
    this.configService.getUser(acct.userId)
      .subscribe(form => {
        if (form) {
          form.accountId = form.accountId || acct.id
        }
        this.form.patchValue(form || {})
        this.form.valueChanges.pipe(
          debounceTime(1000),
          distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
          .subscribe((f) => {
            this.save()
          })
      }, err => {
        this.notificationService.error(err ? err.message : 'Failed to get user profile. ' + err)
      })
  }

  save() {
    if (this.form.valid) {
      this.configService.saveUser(this.form.value)
        .subscribe((profile) => {
          if (profile) {
            this.form.patchValue(profile);
            this.notificationService.info('saved')
          }
        }, err => {
          this.notificationService.error(err ? err.message : 'failed to save. ' + err)
        });
    } else {
      this.validateAll(this.form)
      this.notificationService.error('form is invalid.')
    }
  }

  validateAll(form) {
    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.form.get(key).errors
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError +
            ', err value: ', controlErrors[keyError])
        })
      }

      const control = this.form.get(key)
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({onlySelf: true})
      } else if (control instanceof UntypedFormGroup) {
        this.validateAll(control)
      }
    })
  }
}
