import {HttpClient} from '@angular/common/http';
import {WpCall} from '../models/wp-call.model';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';
import {Count} from '../models/count.model';
import {UmcService} from './umc.service';
import {some, concat} from 'lodash';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class VerifyFrontService extends UmcService {

  htmlSubject = new BehaviorSubject([]);


  constructor(public http: HttpClient) {
    super();
  }

  protected countHtmlShortCodes(): Observable<Count> {
    return this.http
      .post(window['ajaxurl'], {}, WpCall.get('umc_verify_front_count_html_sc'))
      .map(res => this.handlerResponse(res));
  }

  protected getHtmlShortCodes(page = 0, size): Observable<Array<string>> {
    return this.http
      .post(window['ajaxurl'], {page, size}, WpCall.get('umc_verify_front_html_sc'))
      .map(res => this.handlerResponse(res));
  }


  async loadHtmlShortCodes(chunk = 20) {
    const count = await this.countHtmlShortCodes().toPromise();

    const pages = Math.ceil(count.size / chunk);
    let htmls = [];

    const subjectPage = new Subject<number>();

    let i = 0;
    const observablePage = subjectPage.asObservable();

    const observer = {
      next: async (page) => {
        const patialHtmls = await this.getHtmlShortCodes(page, chunk).toPromise();
        htmls = concat(patialHtmls, htmls);
        i++;
        if (i < pages) {
          subjectPage.next(i);
        } else {
          subjectPage.complete();
        }
      },
      complete: () => {
        this.htmlSubject.next(htmls)
      }
    };

    observablePage.subscribe(observer);
    subjectPage.next(0);
  }

  getHtmlAsObservable() {
    return this.htmlSubject.asObservable();
  }

}
