import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class GeneralService {

  constructor(private dialogRef: MatDialog,
              private router: Router) {}

  public logOut() {
    this.dialogRef.closeAll();
    this.router.navigate(['login']);
  }
}
