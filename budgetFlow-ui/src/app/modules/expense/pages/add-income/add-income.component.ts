import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IncomeService} from "../../../../services/services/income.service";

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrl: './add-income.component.scss'
})
export class AddIncomeComponent implements OnInit {
  incomeForm: FormGroup;
  notification: string | null = null; // Tekst powiadomienia
  notificationClass: string = ''; // Klasa powiadomienia (sukces/błąd)

  constructor(private fb: FormBuilder,
              private incomeService: IncomeService) {
    this.incomeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      incomeDate: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get name() {
    return this.incomeForm.get('name')!;
  }

  get amount() {
    return this.incomeForm.get('amount')!;
  }

  get incomeDate() {
    return this.incomeForm.get('incomeDate')!;
  }

  private showNotification(message: string, cssClass: string): void {
    this.notification = message;
    this.notificationClass = cssClass;

    // Ukryj powiadomienie po 3 sekundach
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }

  //TODO: Dodac wyświetlanie przychodów z tego msc.
  //Jakaś lista edycja, usuwanie u know

  onSubmit(): void {
    if (this.incomeForm.valid) {
      const incomeData = this.incomeForm.value;
      this.incomeService.addIncome({body: incomeData}).subscribe({
        next: result => {
          this.showNotification('Przychód został pomyślnie zapisany!', 'alert-success');
          console.log("Przychód dodany")
        },
        error: (err) => {
          this.showNotification('Wystąpił błąd podczas zapisywania przychodu. Spróbuj ponownie.', 'alert-danger');
        }
      })
      console.log('Nowy przychód:', incomeData);
      // Możesz tutaj wywołać serwis, aby zapisać dane
      this.incomeForm.reset();
    }
  }
}
