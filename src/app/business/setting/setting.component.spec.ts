import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingComponent } from './setting.component';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {TranslateModule} from '@ngx-translate/core';

describe('SettingComponent', () => {
  let component: SettingComponent;
  let fixture: ComponentFixture<SettingComponent>;
  const testStore = jasmine.createSpyObj('Store', ['pipe']);

  beforeEach(waitForAsync(() => {
    testStore.pipe.and.returnValue(of(''))
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
      ],
      declarations: [ SettingComponent ],
      providers: [
        {
          provide: Store, useValue: testStore
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
