import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';
import { GroupsComponent } from './pages/groups/groups.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InviteToGroupComponent } from './pages/invite-to-group/invite-to-group.component';
import { AddExpenseComponent } from './pages/add-expense/add-expense.component';


@NgModule({
  declarations: [
    ExpenseListComponent,
    GroupsComponent,
    AddExpenseComponent,
    InviteToGroupComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExpenseModule { }
