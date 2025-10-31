import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionsGeneratorService {
  generateExam(level: number): Observable<Question[]> {
    return of(this.generateQuiz(level));
  }

  generateQuiz(level: number): Question[] {
    const questions: Question[] = [];
    const numQuestions = 10;

    for (let i = 0; i < numQuestions; i++) {
      questions.push(this.generateQuestion(level));
    }

    return questions;
  }

  private generateQuestion(level: number): Question {
    const maxNumber = 10 * level;
    const operations = this.getOperationsForLevel(level);

    const operation = operations[Math.floor(Math.random() * operations.length)];

    let a = this.getRandomInt(1, maxNumber);
    let b = this.getRandomInt(1, maxNumber);

    let questionText = '';
    let correctAnswer = 0;

    switch (operation) {
      case '+':
        correctAnswer = a + b;
        questionText = `${a} + ${b} = ?`;
        break;
      case '-':
        if (a < b) [a, b] = [b, a];
        correctAnswer = a - b;
        questionText = `${a} - ${b} = ?`;
        break;
      case '*':
        correctAnswer = a * b;
        questionText = `${a} × ${b} = ?`;
        break;
      case '/':
        correctAnswer = this.getRandomInt(1, maxNumber / 2);
        b = this.getRandomInt(1, maxNumber / 2);
        a = correctAnswer * b;
        questionText = `${a} ÷ ${b} = ?`;
        break;
    }

    const answers = this.generateAnswerChoices(correctAnswer, level);
    const correctAnswerIndex = answers.indexOf(correctAnswer.toString());

    return {
      questionText,
      answers,
      correctAnswerIndex,
    };
  }

  private generateAnswerChoices(correctAnswer: number, level: number): string[] {
    const choices = new Set<number>();
    choices.add(correctAnswer);

    const variationRange = Math.max(3, level * 2);

    while (choices.size < 4) {
      const offset = this.getRandomInt(-variationRange, variationRange);
      const option = correctAnswer + offset;
      if (option >= 0) choices.add(option);
    }

    const answersArray = Array.from(choices).map((n) => n.toString());
    return this.shuffleArray(answersArray);
  }

  private getOperationsForLevel(level: number): string[] {
    if (level < 3) return ['+', '-'];
    if (level < 6) return ['+', '-', '*'];
    return ['+', '-', '*', '/'];
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private shuffleArray<T>(array: T[]): T[] {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}
