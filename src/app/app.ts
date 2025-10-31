import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExamService } from './services/exam.service';
import { QuestionPresenter } from './components/question-presenter/question-presenter';
import { CompletedExam } from './components/completed-exam/completed-exam';
import { ProgressIndicator } from './components/progress-indicator/progress-indicator';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuestionPresenter, CompletedExam, ProgressIndicator],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly store = inject(ExamService);
}
