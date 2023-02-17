import {ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {BusinessComponent} from './business.component';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeIconsModule} from '../../shared/font.awesome.icons.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {NotificationService} from '../../core/notifications/notification.service';
import {LocalStorageService} from '../../core/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { BusinessModule } from '../business.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

describe('BusinessComponent', () => {
  let component: BusinessComponent;
  let fixture: ComponentFixture<BusinessComponent>;
  const testStore = jasmine.createSpyObj('Store', ['pipe']);
  let location;
  let router;

  beforeEach(async () => {
    testStore.pipe.and.returnValue(of(''))

    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FontAwesomeIconsModule,
        BusinessModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [BusinessComponent],
      providers: [
        {
          provide: Store, useValue: testStore
        },
        {
          provide: NotificationService
        },
        {
          provide: LocalStorageService
        }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    const injector = getTestBed();
    location = injector.inject(Location);
    router = injector.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(location.path()).toBe('');
  });
});
