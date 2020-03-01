import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-third-question',
  templateUrl: './third-question.component.html',
  styleUrls: ['./third-question.component.css']
})
export class ThirdQuestionComponent implements OnInit {
  inContact: boolean;
  isChosen: boolean = false;
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  radioChange(event) {
    this.isChosen = true;
  }

  onClick(event) {
    this.onNext.emit(this.inContact);
    this.inContact = null;
    this.isChosen = false;
  }
}
