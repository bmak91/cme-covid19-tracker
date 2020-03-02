import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-third-question',
  templateUrl: './third-question.component.html',
  styleUrls: ['./third-question.component.css']
})
export class ThirdQuestionComponent implements OnInit {
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event) {
    this.onNext.emit(event);
  }
}
