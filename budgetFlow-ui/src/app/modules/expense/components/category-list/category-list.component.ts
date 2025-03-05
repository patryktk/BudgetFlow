import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  @Input() title!: string;
  @Input() statistics: any[] = [];
}
