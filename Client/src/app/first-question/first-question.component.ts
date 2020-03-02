import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-first-question',
  templateUrl: './first-question.component.html',
  styleUrls: ['./first-question.component.css']
})
export class FirstQuestionComponent implements OnInit {
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(value) {
    this.onNext.emit(value);
  }
}
