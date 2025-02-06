import { Component, OnInit } from '@angular/core'
import { TranslateService} from '@ngx-translate/core'
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms'
import {
  LocalStorageService,
  NotificationService,
  ROUTE_ANIMATIONS_ELEMENTS,
  routeAnimations
} from '../core/core.module'
import { Store} from '@ngrx/store'
import { Router} from '@angular/router'
import { AuthWebService} from '../http/auth-web.service'
import Validation from '../core/validators/validators'
import {SBErrorStateMatcher} from '../core/validators/error-state-matcher'

@Component({
    selector: 'app-register',
    animations: [routeAnimations],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: false
})
export class RegisterComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS
  matcher = new SBErrorStateMatcher()
  form: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['',
      [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
    ],
    confirmPassword: ['', [Validators.required]],
  }, { validators: [Validation.match('password', 'confirmPassword')]})

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private store: Store,
    private translate: TranslateService,
    private authService: AuthWebService,
    private localStorageSvc: LocalStorageService,
    private notificationsService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  async submit() {
    if (this.form.valid) {
      this.authService.register(this.form.value)
        .subscribe((result: any) => {
          this.notificationsService.info(`Account created (${result}). Use your credential to Login.`)
          this.router.navigate(['login'])
        })
    }
  }
}
