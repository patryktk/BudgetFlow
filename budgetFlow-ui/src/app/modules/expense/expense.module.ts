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
import {IncomeCategoryComponent} from './pages/IncomeCategory/income-category/income-category.component';
import {CalendarComponent} from './pages/Calendar/calendar/calendar.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import {ExpenseListCalendarComponent} from './pages/Calendar/expense-list-calendar/expense-list-calendar.component';
import {ColorPickerModule} from "ngx-color-picker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "@angular/material/dialog";
import {
  DialogExpenseCategoryComponent
} from './pages/ExpenseCategory/dialog-expense-category/dialog-expense-category.component';
import {MatTooltip} from "@angular/material/tooltip";
import {BaseChartDirective} from "ng2-charts";
import { SummaryCardComponent } from './components/summary-card/summary-card.component';
import { ChartMainComponent } from './components/chart-main/chart-main.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

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
    MainViewComponent,
    IncomeCategoryComponent,
    CalendarComponent,
    ExpenseListCalendarComponent,
    DialogExpenseCategoryComponent,
    SummaryCardComponent,
    ChartMainComponent,
    CategoryListComponent
  ],
    imports: [
        CommonModule,
        ExpenseRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FullCalendarModule,
        ColorPickerModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatDialogModule,
        MatTooltip,
        BaseChartDirective
    ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pl'}
  ]
})
export class ExpenseModule {
}
