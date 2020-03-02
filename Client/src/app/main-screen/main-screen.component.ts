import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Info } from '../shared/models/info.model';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit, OnChanges {

  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  backgroundState = '';
  wtspUrl = 'whatsapp://send?text=';
  @Input() link: string = '';
  @Input() info: Info;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setResultColor();
  }

  setResultColor() {
    if (this.info) {
      switch (this.info.riskState) {
        case 'Low Risk': {
          this.backgroundState = 'yellow-bckg'
          break;
        }
        case 'Medium Risk': {
          this.backgroundState = 'orange-bckg'
          break;
        }
        case 'High Risk': {
          this.backgroundState = 'red-bckg'
          break;
        }
        default: {
          this.backgroundState = 'black-bckg'
          break;
        }
      }
    }

  }

  onClick(ev) {
    this.onNext.emit();
  }
}
