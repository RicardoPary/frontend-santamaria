import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs/index';

@Component({
  selector: 'kra-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent {

  @Input() onlyNumber: boolean = false;
  @Input() value: string;
  @Output() searchEvent: EventEmitter<any> = new EventEmitter();

  searchBoxTerms = new Subject<string>();

  constructor() {
    /*this.searchBoxTerms
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe((val) => {
        if (val !== undefined) {
          val = val.trim();
        }
        this.searchEvent.emit(val);
      });*/
  }
}
