import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {routeAnimations} from '../../core/animations/route.animations';

@Component({
  selector: 'app-home',
  animations: [routeAnimations],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  tabs = [
    {
      link: 'order', label: 'business.tab.order', data: {title: 'Orders'}
    },
    {
      link: 'quote', label: 'business.tab.quote', data: {title: 'Quotes'}
    },
    {
      link: 'customer', label: 'business.tab.customer', data: {title: 'Customers'}
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
