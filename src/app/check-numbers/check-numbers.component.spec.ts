import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckNumbersComponent } from './check-numbers.component';

describe('CheckNumbersComponent', () => {
  let component: CheckNumbersComponent;
  let fixture: ComponentFixture<CheckNumbersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckNumbersComponent]
    });
    fixture = TestBed.createComponent(CheckNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
