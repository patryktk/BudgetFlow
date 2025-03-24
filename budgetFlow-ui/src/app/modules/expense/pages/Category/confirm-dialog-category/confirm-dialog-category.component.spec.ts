import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogCategoryComponent } from './confirm-dialog-category.component';

describe('ConfirmDialogCategoryComponent', () => {
  let component: ConfirmDialogCategoryComponent;
  let fixture: ComponentFixture<ConfirmDialogCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDialogCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
