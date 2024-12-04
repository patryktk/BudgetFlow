import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseListComponent } from './pages/Expense/expense-list/expense-list.component';
import { GroupsComponent } from './pages/Group/groups/groups.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InviteToGroupComponent } from './pages/Group/invite-to-group/invite-to-group.component';
import { AddExpenseComponent } from './pages/Expense/add-expense/add-expense.component';
import { AddExpenseCategoryComponent } from './pages/ExpenseCategory/add-expense-category/add-expense-category.component';
import localePl from '@angular/common/locales/pl';
import { GroupInvitationComponent } from './pages/Group/group-invitation/group-invitation.component';
import { EditExpenseComponent } from './pages/Expense/edit-expense/edit-expense.component';
import { IncomeListComponent } from './pages/Income/income-list/income-list.component';
import { IncomeFormComponent } from './pages/Income/income-form/income-form.component';
import { IncomeMainComponent } from './pages/Income/income-main/income-main.component';

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
    IncomeListComponent,
    IncomeFormComponent,
    IncomeMainComponent
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
