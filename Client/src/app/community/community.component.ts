import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  community: string;
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onClick(event) {
    this.onNext.emit(this.community);
  }

}
