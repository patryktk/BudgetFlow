import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {authGuard} from "../../services/guard/auth.guard";
import {ExpenseListComponent} from "./pages/expense-list/expense-list.component";

const routes: Routes = [
  {
    path: '', component: MainComponent,
    canActivate: [authGuard],
    children:[
      {path: '', component: ExpenseListComponent, canActivate: [authGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
