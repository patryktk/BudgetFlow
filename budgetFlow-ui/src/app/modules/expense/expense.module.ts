import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';
import { GroupsComponent } from './pages/groups/groups.component';
import {FormsModule} from "@angular/forms";
import { InviteToGroupComponent } from './pages/invite-to-group/invite-to-group.component';


@NgModule({
  declarations: [
    ExpenseListComponent,
    GroupsComponent,
    InviteToGroupComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    FormsModule
  ]
})
export class ExpenseModule { }
