import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  wtspUrl = 'whatsapp://send?text=';

  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  @Input() link: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onClick(ev) {
    this.onNext.emit();
  }
}
