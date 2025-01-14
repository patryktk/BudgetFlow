import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseListCalendarComponent } from './expense-list-calendar.component';

describe('ExpenseListCalendarComponent', () => {
  let component: ExpenseListCalendarComponent;
  let fixture: ComponentFixture<ExpenseListCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseListCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseListCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
