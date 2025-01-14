import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, EventClickArg} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';
import {ExpenseRequest} from "../../../../../services/models/expense-request";
import {ExpenseService} from "../../../../../services/services/expense.service";
import {FullCalendarComponent} from "@fullcalendar/angular";
import {ExpenseCalendarFieldInfo} from "../../../../../services/models/expense-calendar-field-info";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  @ViewChild('fullCalendar') fullCalendarComponent!: FullCalendarComponent;
  showAddExpenseForm = false;
  showListExpenseForm = false;
  selectedExpense: ExpenseRequest | null = null;
  @Input() selectedTab: 'all' | 'user' | 'group' = 'all';
  events: any[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: "pl",
    firstDay: 1,
    selectable: true,
    dateClick: (arg) => this.handleDateClick(arg),
    events: [],
    eventClick: arg => this.handleEventClick(arg),
  };

  constructor(
    private expenseService: ExpenseService) {
  }

  ngOnInit(): void {
    this.fetchExpenses();
  }

  private handleDateClick(arg: DateClickArg) {
    this.selectedExpense = {
      name: '',
      expenseDate: arg.dateStr, // Ustawienie expenseDate
    }
    this.showAddExpenseForm = true;
  }

  closetListExpenseForm() {
    this.showListExpenseForm = false;
  }

  closeAddExpenseForm() {
    this.showAddExpenseForm = false;
  }

  private fetchExpenses() {
    this.expenseService.getExpensesToCalendarByCategory().subscribe({
      next: response => {
        this.feedEvents(response);
      },
      error: err => {
        console.log("Error while loading expenses", err)
      }
    })
  }

  private feedEvents(response: Array<ExpenseCalendarFieldInfo>) {
    const calendarApi = this.fullCalendarComponent.getApi();
    calendarApi.removeAllEvents();

    this.events = response.map(expense => {
      return {
        title: `${expense.name} - ${expense.value} PLN`,
        start: expense.date,
        end: expense.date,
        allDay: true,
      };
    });
    calendarApi.addEventSource(this.events)
  }

  private handleEventClick(arg: EventClickArg) {
    // this.selectedExpense = arg.event.extendedProps['expenseModel'];
    this.showListExpenseForm = true;
  }
}
