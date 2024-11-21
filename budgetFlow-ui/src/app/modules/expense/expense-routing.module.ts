import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {authGuard} from "../../services/guard/auth.guard";
import {ExpenseListComponent} from "./pages/expense-list/expense-list.component";
import {GroupsComponent} from "./pages/groups/groups.component";
import {AddExpenseComponent} from "./pages/add-expense/add-expense.component";
import {AddExpenseCategoryComponent} from "./pages/add-expense-category/add-expense-category.component";
import {GroupInvitationComponent} from "./pages/group-invitation/group-invitation.component";

const routes: Routes = [
  {
    path: '', component: MainComponent,
    canActivate: [authGuard],
    children:[
      {path: '', component: ExpenseListComponent, canActivate: [authGuard],},
      {path: 'groups', component: GroupsComponent, canActivate: [authGuard],},
      {path: 'addExpense', component: AddExpenseComponent, canActivate: [authGuard],},
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
