import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';
import { GroupsComponent } from './pages/groups/groups.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InviteToGroupComponent } from './pages/invite-to-group/invite-to-group.component';
import { AddExpenseComponent } from './pages/add-expense/add-expense.component';
import { AddExpenseCategoryComponent } from './pages/add-expense-category/add-expense-category.component';
import localePl from '@angular/common/locales/pl';
import { GroupInvitationComponent } from './pages/group-invitation/group-invitation.component';
import { EditExpenseComponent } from './pages/edit-expense/edit-expense.component';
import { AddIncomeComponent } from './pages/add-income/add-income.component';

registerLocaleData(localePl);


@NgModule({
  declarations: [
    ExpenseListComponent,
    GroupsComponent,
    AddExpenseComponent,
    InviteToGroupComponent,
    AddExpenseCategoryComponent,
    GroupInvitationComponent,
    EditExpenseComponent,
    AddIncomeComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pl'}
  ]
})
export class ExpenseModule { }
