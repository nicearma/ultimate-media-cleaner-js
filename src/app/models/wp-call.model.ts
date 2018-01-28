import {HttpHeaders, HttpParams} from '@angular/common/http';

export class WpCall {

  static get(action: string): { headers: HttpHeaders, params: HttpParams } {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('action', action);

    const options: any = {};
    options.headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    options.params = searchParams;
    return options;
  }

}
