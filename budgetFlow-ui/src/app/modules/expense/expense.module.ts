import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';

import {ExpenseRoutingModule} from './expense-routing.module';
import {GroupsComponent} from './pages/Group/groups/groups.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InviteToGroupComponent} from './pages/Group/invite-to-group/invite-to-group.component';
import {AddExpenseCategoryComponent} from './pages/ExpenseCategory/add-expense-category/add-expense-category.component';
import localePl from '@angular/common/locales/pl';
import {GroupInvitationComponent} from './pages/Group/group-invitation/group-invitation.component';
import {IncomeListComponent} from './pages/Income/income-list/income-list.component';
import {IncomeFormComponent} from './pages/Income/income-form/income-form.component';
import {IncomeMainComponent} from './pages/Income/income-main/income-main.component';
import {ExpenseMainComponent} from './pages/Expense/expense-main/expense-main.component';
import {ExpenseFormComponent} from './pages/Expense/expense-form/expense-form.component';
import {ExpenseListComponent} from "./pages/Expense/expense-list/expense-list.component";
import {MainViewComponent} from './pages/MainPage/main-view/main-view.component';

registerLocaleData(localePl);


@NgModule({
  declarations: [
    ExpenseListComponent,
    GroupsComponent,
    InviteToGroupComponent,
    AddExpenseCategoryComponent,
    GroupInvitationComponent,
    IncomeListComponent,
    IncomeFormComponent,
    IncomeMainComponent,
    ExpenseMainComponent,
    ExpenseFormComponent,
    MainViewComponent
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
export class ExpenseModule {
}
