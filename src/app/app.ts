import { Component, inject, signal } from '@angular/core';
import { ExamService } from './services/exam.service';
import { QuestionPresenter } from './components/question-presenter/question-presenter';
import { CompletedExam } from './components/completed-exam/completed-exam';
import { ProgressIndicator } from './components/progress-indicator/progress-indicator';
import { DifficultyMenu } from './components/difficulty-menu/difficulty-menu';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuestionPresenter, CompletedExam, ProgressIndicator, DifficultyMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly store = inject(ExamService);
}
