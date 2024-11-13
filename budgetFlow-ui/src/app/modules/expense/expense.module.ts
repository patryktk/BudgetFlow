import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';
import { GroupsComponent } from './pages/groups/groups.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ExpenseListComponent,
    GroupsComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    FormsModule
  ]
})
export class ExpenseModule { }
