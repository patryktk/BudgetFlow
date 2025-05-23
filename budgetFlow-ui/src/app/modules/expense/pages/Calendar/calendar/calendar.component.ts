import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, EventClickArg} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';
import {ExpenseRequest} from "../../../../../services/models/expense-request";
import {ExpenseService} from "../../../../../services/services/expense.service";
import {FullCalendarComponent} from "@fullcalendar/angular";
import {ExpenseCalendarFieldInfo} from "../../../../../services/models/expense-calendar-field-info";
import {UtilsService} from "../../../../../services/utils/utils.service";
import tinycolor from "tinycolor2";


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss',
    standalone: false
})
export class CalendarComponent implements OnInit {
  @ViewChild('fullCalendar') fullCalendarComponent!: FullCalendarComponent;
  showAddExpenseForm = false;
  showListExpenseForm = false;
  selectedExpense: ExpenseRequest | null = null;
  @Input() selectedTab: 'all' | 'user' | 'group' = 'all';
  events: any[] = [];
  dateDay: string | undefined = "";
  themeColor = '#c4a347';
  blackToolbarColor = '#1a1b1c';

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: "pl",
    firstDay: 1,
    height: 'auto',
    headerToolbar: {
      start: '',
      center: 'title'
    },
    selectable: true,
    dateClick: (arg) => this.handleDateClick(arg),
    events: [],
    eventClick: arg => this.handleEventClick(arg),

    dayCellDidMount: (info) => {
      // Zmiana koloru numerów dni
      const dayNumber = info.el.querySelector('.fc-daygrid-day-number');
      if (dayNumber) {
        (dayNumber as HTMLElement).style.color = this.themeColor;
      }
    },

    viewDidMount: (info) => {
      // Zmiana koloru nagłówków dni tygodnia
      const headerCells = document.querySelectorAll('.fc-col-header-cell-cushion');
      headerCells.forEach(cell => {
        (cell as HTMLElement).style.color = this.blackToolbarColor;
      });

      // Zmiana koloru tytułu miesiąca i roku
      const toolbarTitle = document.querySelector('.fc-toolbar-title');
      if (toolbarTitle) {
        (toolbarTitle as HTMLElement).style.color = this.blackToolbarColor;
      }
    }
  };

  constructor(
    private expenseService: ExpenseService,
    private utilsService: UtilsService) {
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
    this.fetchExpenses();
    this.showListExpenseForm = false;
  }

  closeAddExpenseForm() {
    this.fetchExpenses();
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
        backgroundColor: expense.hexColor,
        borderColor: expense.hexColor,
        textColor: tinycolor(expense.hexColor).isLight() ? 'black' : 'white'
      };
    });

    calendarApi.addEventSource(this.events)
  }

  private handleEventClick(arg: EventClickArg) {
    this.dateDay = this.utilsService.formatDateFromISOToNormal(arg.event.start?.toISOString() ?? '');
    this.showListExpenseForm = true;
  }
}
