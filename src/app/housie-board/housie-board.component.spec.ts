import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousieBoardComponent } from './housie-board.component';

describe('HousieBoardComponent', () => {
  let component: HousieBoardComponent;
  let fixture: ComponentFixture<HousieBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HousieBoardComponent]
    });
    fixture = TestBed.createComponent(HousieBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
