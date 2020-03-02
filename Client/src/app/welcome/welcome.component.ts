import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  enableNext = false;
  constructor() { }

  ngOnInit(): void {
  }

  onClick(ev) {
    this.onNext.emit();
  }

  resolved(captchaResponse: string) {
    if (captchaResponse) {
      this.enableNext = true;
    }
    else {
      this.enableNext = false;
    }
  }
}
