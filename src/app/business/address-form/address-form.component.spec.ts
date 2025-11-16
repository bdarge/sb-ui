import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFormComponent } from './address-form.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FormsModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [AddressFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
