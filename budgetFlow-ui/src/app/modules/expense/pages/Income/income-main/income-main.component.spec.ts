import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeMainComponent } from './income-main.component';

describe('IncomeComponent', () => {
  let component: IncomeMainComponent;
  let fixture: ComponentFixture<IncomeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomeMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
