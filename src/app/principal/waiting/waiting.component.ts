import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RxComponent} from '../basic/rx.component';

@Component({
  selector: 'umc-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss']
})
export class WaitingComponent extends RxComponent {

  _text;

  points = [];

  @Input()
  set text(text: string) {
    this._text = text;
    this.ngOnDestroy();
    const interval = Observable.interval(200);
    this.push(interval.subscribe(() => {
      if (this.points.length > 5) {
        this.points.length = 0;
      }
      this.points.push(1);
    }));
  };


  get text() {
    return this._text;
  }

}
