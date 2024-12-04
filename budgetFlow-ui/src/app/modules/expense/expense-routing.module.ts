import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {authGuard} from "../../services/guard/auth.guard";
import {GroupsComponent} from "./pages/Group/groups/groups.component";
import {AddExpenseComponent} from "./pages/Expensee/add-expense/add-expense.component";
import {AddExpenseCategoryComponent} from "./pages/ExpenseCategory/add-expense-category/add-expense-category.component";
import {GroupInvitationComponent} from "./pages/Group/group-invitation/group-invitation.component";
import {IncomeMainComponent} from "./pages/Income/income-main/income-main.component";
import {ExpenseMainComponent} from "./pages/Expense/expense-main/expense-main.component";

const routes: Routes = [
  {
    path: '', component: MainComponent,
    canActivate: [authGuard],
    children:[
      {path: '', component: ExpenseMainComponent, canActivate: [authGuard],},
      {path: 'groups', component: GroupsComponent, canActivate: [authGuard],},
      {path: 'addExpense', component: AddExpenseComponent, canActivate: [authGuard],},
      {path: 'income', component: IncomeMainComponent, canActivate: [authGuard],},
      {path: 'addExpenseCategory', component: AddExpenseCategoryComponent, canActivate: [authGuard],},
      {path: 'join-group', component: GroupInvitationComponent, canActivate: [authGuard],},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
