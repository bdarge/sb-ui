import { Component } from '@angular/core';
import { Observable} from 'rxjs';
import { select, Store} from '@ngrx/store';
import { selectTheme} from './core/settings/settings.selectors';
import { State} from './core/settings/settings.model';
import { routeAnimations} from './core/animations/route.animations';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  animations: [routeAnimations],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Business X';
  theme$: Observable<string>;

  constructor(
    private store: Store<State>,
    private titleService: Title
  ) {}

  ngOnInit(): void  {
    this.theme$ = this.store.pipe(select(selectTheme));
    this.titleService.setTitle('Business X');
  }
}
