import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class LogService {

  log = new BehaviorSubject<{ type: string, playload: any }>(null);

  constructor() {
  }

  debug(message, object?) {
    this.log.next({type: 'debug', playload: {message, object}});
  }

  error(message, object?) {
    this.log.next({type: 'debug', playload: {message, object}});
  }

  info(message, object?) {
    this.log.next({type: 'debug', playload: {message, object}});
  }

  logObservable() {
    return this.log.asObservable();
  }

}
