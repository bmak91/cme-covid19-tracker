import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fourth-question',
  templateUrl: './fourth-question.component.html',
  styleUrls: ['./fourth-question.component.css']
})
export class FourthQuestionComponent implements OnInit {
  inPresence: boolean;
  isChosen: boolean = false;
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  radioChange(event) {
    this.isChosen = true;
  }

  onClick(event) {
    this.onNext.emit(this.inPresence);
    this.isChosen = false;
    this.inPresence = null;
  }
}
