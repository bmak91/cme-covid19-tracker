import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-first-question',
  templateUrl: './first-question.component.html',
  styleUrls: ['./first-question.component.css']
})
export class FirstQuestionComponent implements OnInit {
  withSymptoms: boolean;
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  isChosen: boolean =false;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event) {
    this.onNext.emit(this.withSymptoms);
    this.withSymptoms = null;
    this.isChosen = false;
  }

  radioChange(event) {
    this.isChosen = true;
  }
}
