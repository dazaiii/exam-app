import { computed, inject, Injectable, signal } from '@angular/core';
import { Question } from '../models/question.model';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { QuestionsGeneratorService } from './questions-generator.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  readonly #userAnswers = signal<number[]>([]);
  readonly #questions = signal<Question[]>([]);
  readonly #isGenerating = signal<boolean>(false);
  readonly #generateExam$ = new BehaviorSubject<number>(1);
  readonly #changeDifficultyMenu = signal(true);

  readonly isGenerating = this.#isGenerating.asReadonly();
  readonly questions = this.#questions.asReadonly();
  readonly level = toSignal(this.#generateExam$, { initialValue: 1 });
  readonly questionsCount = computed(() => this.questions().length);
  readonly isQuizCompleted = computed(() => this.userAnswers().length === this.questionsCount());
  readonly correctAnswers = computed(() => this.userAnswers().filter((answer) => answer.isCorrect));
  readonly correctAnswersCount = computed(() => this.correctAnswers().length);
  readonly currentQuestionIndex = computed(() => this.userAnswers().length);
  readonly currentQuestion = computed(() => this.questions()[this.currentQuestionIndex()]);
  readonly changeDifficultyMenu = this.#changeDifficultyMenu.asReadonly();

  readonly userAnswers = computed(() =>
    this.#userAnswers().map((answerIndex, questionIndex) => {
      const question = this.questions()[questionIndex];
      return {
        userAnswerIndex: answerIndex,
        isCorrect: answerIndex === question.correctAnswerIndex,
      };
    })
  );

  answerCurrentQuestion(answerIndex: number) {
    this.#userAnswers.update((answers) => [...answers, answerIndex]);
  }

  increaseExamLevel() {
    this.#generateExam$.next(this.#generateExam$.value + 1);
  }

  decreaseExamLevel() {
    this.#generateExam$.next(this.#generateExam$.value === 1 ? 1 : this.#generateExam$.value - 1);
  }

  repeatLevel() {
    this.#generateExam$.next(this.#generateExam$.value);
  }

  openChangeDifficultyMenu() {
    this.#changeDifficultyMenu.set(true);
  }

  startExam() {
    this.#changeDifficultyMenu.set(false);
    this.#generateExam$.next(this.level());
  }

  constructor() {
    const questionsGenerator = inject(QuestionsGeneratorService);
    this.#generateExam$
      .pipe(
        tap(() => this.#isGenerating.set(true)),
        switchMap((level) => questionsGenerator.generateExam(level)),
        tap((questions) => {
          this.#questions.set(questions);
          this.#isGenerating.set(false);
          this.#userAnswers.set([]);
        })
      )
      .subscribe();
  }
}
