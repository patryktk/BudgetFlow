import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';


@NgModule({
  declarations: [
    ExpenseListComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule
  ]
})
export class ExpenseModule { }
