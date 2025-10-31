import { Component, input, output } from '@angular/core';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-question-presenter',
  imports: [],
  templateUrl: './question-presenter.html',
  styleUrl: './question-presenter.scss',
})
export class QuestionPresenter {
  readonly question = input.required<Question>();
  readonly answered = output<number>();
  readonly answers = ['A', 'B', 'C', 'D'];

  chooseAnswer(answerIndex: number) {
    this.answered.emit(answerIndex);
  }
}
