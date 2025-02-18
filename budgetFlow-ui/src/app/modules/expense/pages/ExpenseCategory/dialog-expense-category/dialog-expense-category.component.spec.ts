import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExpenseCategoryComponent } from './dialog-expense-category.component';

describe('DialogExpenseCategoryComponent', () => {
  let component: DialogExpenseCategoryComponent;
  let fixture: ComponentFixture<DialogExpenseCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogExpenseCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogExpenseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
