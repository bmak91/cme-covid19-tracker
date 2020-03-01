import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-second-question',
  templateUrl: './second-question.component.html',
  styleUrls: ['./second-question.component.css']
})
export class SecondQuestionComponent implements OnInit {

  isPositive: boolean;
  isChosen: boolean = false;
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  radioChange(event) {
    this.isChosen = true;
  }

  onClick(event) {
    this.onNext.emit(this.isPositive);
    this.isChosen = false;
    this.isPositive = null;
  }
}
