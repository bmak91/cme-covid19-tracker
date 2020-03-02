import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fourth-question',
  templateUrl: './fourth-question.component.html',
  styleUrls: ['./fourth-question.component.css']
})
export class FourthQuestionComponent implements OnInit {
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event) {
    this.onNext.emit(event);
  }
}
