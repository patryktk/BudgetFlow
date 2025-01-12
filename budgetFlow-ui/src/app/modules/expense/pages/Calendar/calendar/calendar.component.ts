import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, EventClickArg} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';
import {ExpenseRequest} from "../../../../../services/models/expense-request";
import {ExpenseService} from "../../../../../services/services/expense.service";
import {ExpenseResponse} from "../../../../../services/models/expense-response";
import {FullCalendarComponent} from "@fullcalendar/angular";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  @ViewChild('fullCalendar') fullCalendarComponent!: FullCalendarComponent;
  showForm = false;
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
    this.showForm = true;
  }

  closeForm() {
    this.fetchExpenses();
    this.showForm = false;
  }

  private fetchExpenses() {
    this.expenseService.getAllExpensesByUser().subscribe({
      next: response => {
        this.feedEvents(response);
      },
      error: err => {
        console.log("Error while loading expenses", err)
      }
    })
  }

  private feedEvents(response: Array<ExpenseResponse>) {
    const calendarApi = this.fullCalendarComponent.getApi();
    calendarApi.removeAllEvents();

    this.events = response.map(expense => {
      return {
        title: `${expense.expenseCategory?.name} - ${expense.amount} PLN`,
        start: expense.expenseDate,
        end: expense.expenseDate,
        allDay: true,
        expenseModel: expense
      };
    });
    calendarApi.addEventSource(this.events)
  }

  private handleEventClick(arg: EventClickArg) {
    this.selectedExpense = arg.event.extendedProps['expenseModel'];
    this.showForm = true;
  }
}
