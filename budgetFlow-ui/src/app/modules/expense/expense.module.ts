import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';

import {ExpenseRoutingModule} from './expense-routing.module';
import {GroupsComponent} from './pages/Group/groups/groups.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InviteToGroupComponent} from './pages/Group/invite-to-group/invite-to-group.component';
import localePl from '@angular/common/locales/pl';
import {GroupInvitationComponent} from './pages/Group/group-invitation/group-invitation.component';
import {IncomeListComponent} from './pages/Income/income-list/income-list.component';
import {IncomeFormComponent} from './pages/Income/income-form/income-form.component';
import {IncomeMainComponent} from './pages/Income/income-main/income-main.component';
import {ExpenseMainComponent} from './pages/Expense/expense-main/expense-main.component';
import {ExpenseFormComponent} from './pages/Expense/expense-form/expense-form.component';
import {ExpenseListComponent} from "./pages/Expense/expense-list/expense-list.component";
import {MainViewComponent} from './pages/MainPage/main-view/main-view.component';
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
import {MatTooltip} from "@angular/material/tooltip";
import {BaseChartDirective} from "ng2-charts";
import {SummaryCardComponent} from './components/summary-card/summary-card.component';
import {ChartMainComponent} from './components/chart-main/chart-main.component';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatTable} from "@angular/material/table";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSort} from "@angular/material/sort";
import {MatIcon} from "@angular/material/icon";
import {MatPaginator} from "@angular/material/paginator";
import {CategoryMainComponent} from './pages/Category/category-main/category-main.component';
import {CategoryFormComponent} from './pages/Category/category-form/category-form.component';
import {MatOption, MatSelect} from "@angular/material/select";
import {CategoryListMainComponent} from './pages/Category/category-list-main/category-list-main.component';
import {CategoryListComponent} from "./components/category-list/category-list.component";
import {MatTabGroup} from "@angular/material/tabs";
import {
  ConfirmDialogCategoryComponent
} from './pages/Category/confirm-dialog-category/confirm-dialog-category.component';

registerLocaleData(localePl);


@NgModule({
  declarations: [
    ExpenseListComponent,
    GroupsComponent,
    InviteToGroupComponent,
    GroupInvitationComponent,
    IncomeListComponent,
    IncomeFormComponent,
    IncomeMainComponent,
    ExpenseMainComponent,
    ExpenseFormComponent,
    MainViewComponent,
    CalendarComponent,
    ExpenseListCalendarComponent,
    SummaryCardComponent,
    ChartMainComponent,
    CategoryListComponent,
    CategoryMainComponent,
    CategoryFormComponent,
    CategoryListMainComponent,
    ConfirmDialogCategoryComponent
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
    BaseChartDirective,
    MatCardActions,
    MatTable,
    MatProgressSpinner,
    MatSort,
    MatIcon,
    MatPaginator,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatSelect,
    MatOption,
    MatTabGroup,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pl'}
  ]
})
export class ExpenseModule {
}
