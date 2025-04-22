import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-summary-card',
  standalone: false,
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss'
})
export class SummaryCardComponent {
  @Input() title!: string;
  @Input() value?: number;
}
