import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {AccountActivationComponent} from "./pages/account-activation/account-activation.component";
import {authGuard} from "./services/guard/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'activate-account', component: AccountActivationComponent},
  {
    path: 'expense',
    loadChildren: () => import('./modules/expense/expense.module').then((m) => m.ExpenseModule),
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
