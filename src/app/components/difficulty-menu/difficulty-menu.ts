import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-difficulty-menu',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './difficulty-menu.html',
  styleUrl: './difficulty-menu.scss',
})
export class DifficultyMenu {
  readonly level = input.required<number>();
  readonly increaseLevel = output<void>();
  readonly decreaseLevel = output<void>();
  readonly startExam = output<void>();
}
