import { AppPage } from './app.po';

import { getCurrentRouteUrl } from '../../utils/utils';
import {by, element} from 'protractor';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => (page = new AppPage()));

  it('should redirect to "login" route', () => {
    page.navigateTo();
    expect(getCurrentRouteUrl()).toEqual('login');
  });

  it('should redirect to "order" route', () => {
    page.navigateTo();

    element(by.css('input[type=email]')).sendKeys('test123@fake.com');
    element(by.css('input[type=password]')).sendKeys('$test123');
    element(by.css('form'))
      .submit()
      .then(() => {
        expect(getCurrentRouteUrl()).toEqual('order');
      })
  });
});
