import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { routeAnimations } from '../../core/animations/route.animations';

@Component({
    selector: 'app-home',
    animations: [routeAnimations],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HomeComponent implements OnInit {
  tabs = [
    {
      link: 'transaction', label: 'business.tab.transaction', data: {title: 'Transactions'}
    },
    {
      link: 'customer', label: 'business.tab.customer', data: {title: 'Customers'}
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
