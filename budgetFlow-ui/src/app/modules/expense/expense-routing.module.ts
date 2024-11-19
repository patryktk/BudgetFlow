import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {authGuard} from "../../services/guard/auth.guard";
import {ExpenseListComponent} from "./pages/expense-list/expense-list.component";
import {GroupsComponent} from "./pages/groups/groups.component";
import {AddExpenseComponent} from "./pages/add-expense/add-expense.component";

const routes: Routes = [
  {
    path: '', component: MainComponent,
    canActivate: [authGuard],
    children:[
      {path: '', component: ExpenseListComponent, canActivate: [authGuard],},
      {path: 'groups', component: GroupsComponent, canActivate: [authGuard],},
      {path: 'addExpense', component: AddExpenseComponent, canActivate: [authGuard],}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
