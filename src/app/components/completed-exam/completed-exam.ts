import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-completed-exam',
  imports: [],
  templateUrl: './completed-exam.html',
  styleUrl: './completed-exam.scss',
})
export class CompletedExam {
  readonly correctAnswers = input.required<number>();
  readonly total = input.required<number>();
  readonly score = computed(
    () => (this.total() === 0 ? 0 : this.correctAnswers() / this.total()) * 100
  );
  readonly repeatLevel = output<void>();
}
