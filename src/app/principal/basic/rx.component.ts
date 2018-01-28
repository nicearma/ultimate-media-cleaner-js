import {OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';


export class RxComponent implements OnDestroy {

  suscriptions: Array<Subscription> = [];

  push(s: Subscription) {
    this.suscriptions.push(s);
  }

  ngOnDestroy(): void {
    this.suscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }

}
