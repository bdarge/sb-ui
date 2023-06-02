import { Component, OnInit, ViewChild } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { LocalStorageService, NotificationService, ROUTE_ANIMATIONS_ELEMENTS } from '../../core/core.module';
import { ConfigWebService } from '../../http/config-web.service';
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { User } from "../../model/user";
import { Account } from "../../model/account";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS
  userForm = this.fb.group({
    id: [''],
    address: [''],
    username: ['', [Validators.required]]
  })

  constructor(private fb: UntypedFormBuilder,
              private configService: ConfigWebService,
              private notificationService: NotificationService,
              private localStorageSvc: LocalStorageService) {

  }

  ngOnInit() {
    const acct = this.localStorageSvc.getItem('ACCOUNT') as Account
    const adminRoles = [1, 2]
    let isAdmin : boolean = false
    this.configService.getUser(acct.userId)
      .subscribe(data => {
        if (!data || !data.roles || !data.roles.find(r => r.id in adminRoles)) {
          this.userForm.disable({ onlySelf: true });
        } else {
          if (data && data.roles && data.roles.find(r => r.id == 1)) {
            isAdmin = true
          }
        }

        this.userForm.patchValue(data || {})

        this.userForm.valueChanges.pipe(
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
    if (this.userForm.valid) {
      this.configService.saveUser(this.userForm.value as User)
        .subscribe((user) => {
          if (user) {
            this.userForm.patchValue(user as User,  { emitEvent: false });
            this.notificationService.info('saved')
          }
        }, err => {
          this.notificationService.error(err ? err.message : 'failed to save. ' + err)
        });
    } else {
      this.validateAll(this.userForm)
      this.notificationService.error('form is invalid.')
    }
  }

  validateAll(userForm) {
    Object.keys(userForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.userForm.get(key).errors
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError +
            ', err value: ', controlErrors[keyError])
        })
      }

      const control = this.userForm.get(key)
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({onlySelf: true})
      } else if (control instanceof UntypedFormGroup) {
        this.validateAll(control)
      }
    })
  }
}
