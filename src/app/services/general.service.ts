import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { LocalStorageService } from '../core/local-storage/local-storage.service';

@Injectable()
export class GeneralService {
  constructor(
    private dialogRef: MatDialog,
    private router: Router,
    private ngZone: NgZone,
    private localStorageSvc: LocalStorageService
  ) {}

  public logOut() {
    this.dialogRef.closeAll();
    this.localStorageSvc.removeItem('ACCOUNT');
    this.localStorageSvc.removeItem('TOKEN');
    this.ngZone.run(() => this.router.navigate(['login']));
  }
}
