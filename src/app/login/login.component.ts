import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode'
import {
  LocalStorageService,
  ROUTE_ANIMATIONS_ELEMENTS,
  routeAnimations
} from '../core/core.module';
import { Router } from '@angular/router';
import { AuthWebService } from '../http/auth-web.service';
import { Language } from '../model/user';

@Component({
  selector: 'app-login',
  animations: [routeAnimations],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private authService: AuthWebService,
    private localStorageSvc: LocalStorageService,
  ) {
  }

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {
      this.authService.login(this.form.value)
        .subscribe((result: any) => {
          const decoded = jwtDecode(result.token)
          this.localStorageSvc.setItem('ACCOUNT', decoded);
          this.localStorageSvc.setItem('TOKEN', result.token);
          // get it from db? 
          this.localStorageSvc.setItem('LANGUAGES', [
            { 'name': 'en', 'currency': 'usd' } as Language,
            { 'name': 'sv', 'currency': 'sek' } as Language]);
          this.router.navigate(['business']);
        })
    }
  }
}
