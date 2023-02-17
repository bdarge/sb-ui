import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';

describe('AppComponent', () => {
  const testStore = jasmine.createSpyObj('Store', ['pipe']);

  beforeEach(waitForAsync(() => {
    testStore.pipe.and.returnValue(of(''))

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: Store, useValue: testStore
        }],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot()
      ]
    })
      .compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
