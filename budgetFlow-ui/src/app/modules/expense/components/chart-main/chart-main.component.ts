import {Component, Input} from '@angular/core';
import {ChartType} from "chart.js";

@Component({
  selector: 'app-chart-main',
  standalone: false,
  templateUrl: './chart-main.component.html',
  styleUrl: './chart-main.component.scss'
})
export class ChartMainComponent {
  @Input() isDataLoaded!: boolean;
  @Input() statistics: any[] = [];
  @Input() chartData!: any;
  @Input() chartOptions!: any;
  @Input() chartType!: ChartType;
}
