import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';
import { GroupsComponent } from './pages/groups/groups.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddExpenseComponent } from './pages/add-expense/add-expense.component';


@NgModule({
  declarations: [
    ExpenseListComponent,
    GroupsComponent,
    AddExpenseComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExpenseModule { }
