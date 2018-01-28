import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output} from '@angular/core';
import {OptionService} from '../../services/option.service';
import {RxComponent} from '../basic/rx.component';
import {find, get} from 'lodash';
import {Option} from '../../models/option.model';

@Component({
  selector: 'umc-ignore',
  templateUrl: './ignore.component.html',
  styleUrls: ['./ignore.component.scss']
})
export class IgnoreComponent extends RxComponent implements OnInit, OnChanges {

  exists = false;

  @Input()
  type: string;

  @Input()
  value: string;

  option: Option;

  constructor(protected optionService: OptionService) {
    super();
  }

  ngOnInit(): void {
    this.push(this.optionService.optionAsObservable().subscribe((option) => {
      this.option = option;
      this.ngOnChanges();
    }));
  }

  ngOnChanges() {

    const array = get(this.option, this.type);

    this.exists = !!find(array, (v) => {
      const result = v === this.value;
      return result;
    });

  }

  @HostListener('click')
  click() {
    if (this.exists) {
      this.remove();
    } else {
      this.add();
    }
  }

  add() {
    const array = get(this.option, this.type);
    array.push(this.value);
    this.optionService.updateAndShare(this.option);
  }

  remove() {
    const array = get(this.option, this.type);
    const index = array.indexOf(this.value);
    if (index > -1) {
      array.splice(index, 1);
    }
    this.optionService.updateAndShare(this.option);
  }

}
