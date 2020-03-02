import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Input } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { AppService } from '../app.component.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  community: string;
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  @Input() dir: 'rtl';
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<any[]>;
  fruits: any[] = [];
  allCommunities: any[];
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  currentList: any;

  constructor(private appService: AppService) {
    this.appService.searchCommunity('').subscribe(x => {
      if (x && x.body && x.body.results && x.body.results.length > 0) {
        this.allCommunities = x.body.results;
      }
    });
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>

        fruit ? this._filter(fruit) : this.allCommunities?.slice()));
  }

  ngOnInit(): void {
  }

  onClick() {
    this.onNext.emit(this.fruits);
    this.fruits = [];
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({id: null, name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: any): string[] {
    let filterValue = '';
    if(typeof(value) == "string"){
      filterValue = value?.toLowerCase();
    }
    return this.allCommunities.filter(fruit => fruit.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onChange(event) {
    console.log(event);
  }
}
