import { Component, computed, input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress-indicator',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './progress-indicator.html',
  styleUrl: './progress-indicator.scss',
})
export class ProgressIndicator {
  readonly current = input.required<number>();
  readonly total = input.required<number>();
  readonly level = input.required<number>();
  readonly progress = computed(() =>
    this.total() === 0 ? 0 : (this.current() / this.total()) * 100
  );
}
