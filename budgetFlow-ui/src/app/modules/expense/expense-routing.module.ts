import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {authGuard} from "../../services/guard/auth.guard";
import {GroupsComponent} from "./pages/Group/groups/groups.component";
import {AddExpenseCategoryComponent} from "./pages/ExpenseCategory/add-expense-category/add-expense-category.component";
import {GroupInvitationComponent} from "./pages/Group/group-invitation/group-invitation.component";
import {IncomeMainComponent} from "./pages/Income/income-main/income-main.component";
import {ExpenseMainComponent} from "./pages/Expense/expense-main/expense-main.component";
import {MainViewComponent} from "./pages/MainPage/main-view/main-view.component";
import {IncomeCategoryComponent} from "./pages/IncomeCategory/income-category/income-category.component";
import {CalendarComponent} from "./pages/Calendar/calendar/calendar.component";

const routes: Routes = [
  {
    path: '', component: MainComponent,
    canActivate: [authGuard],
    children: [
      {path: '', component: MainViewComponent, canActivate: [authGuard],},
      {path: 'groups', component: GroupsComponent, canActivate: [authGuard],},
      {path: 'expense', component: ExpenseMainComponent, canActivate: [authGuard],},
      {path: 'income', component: IncomeMainComponent, canActivate: [authGuard],},
      {path: 'incomeCategory', component: IncomeCategoryComponent, canActivate: [authGuard],},
      {path: 'addExpenseCategory', component: AddExpenseCategoryComponent, canActivate: [authGuard],},
      {path: 'join-group', component: GroupInvitationComponent, canActivate: [authGuard],},
      {path: 'calendar', component: CalendarComponent, canActivate: [authGuard],},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule {
}
