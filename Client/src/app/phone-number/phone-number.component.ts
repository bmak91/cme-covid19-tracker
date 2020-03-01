import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css']
})
export class PhoneNumberComponent implements OnInit {
  phoneNumber = '+961';
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onClick(event) {
    this.onNext.emit(this.phoneNumber);
    this.phoneNumber = null;
  }
}
