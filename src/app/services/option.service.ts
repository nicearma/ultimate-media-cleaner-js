import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Option} from '../models/option.model';
import {WpCall} from '../models/wp-call.model';
import {UmcService} from './umc.service';
import {Backup} from '../models/options/backup.model';
import {Check} from '../models/options/check.model';
import {Ignore} from '../models/options/ignore.model';
import {Show} from '../models/options/show.model';

@Injectable()
export class OptionService extends UmcService {

  optionSubject = new BehaviorSubject<Option>(null);

  constructor(public http: HttpClient) {
    super();
  }

  async updateAndShare(option: Option) {
    const newOption = await this.update(option).toPromise();
    this.optionSubject.next(newOption);
  }

  update(option: Option) {
    return this.http
      .post(window['ajaxurl'], {option}, WpCall.get('umc_option_update'))
      .map(res => this.handlerResponse(res));
  }

  async get() {
    let option = await this.http
      .get(window['ajaxurl'], WpCall.get('umc_option_get'))
      .map(res => this.handlerResponse(res)).toPromise();

    if (!option) {
      option = this.defaultOption();
      option = await this.update(option).toPromise();
    }
    this.optionSubject.next(option);

  }


  optionAsObservable() {
    return this.optionSubject.asObservable();
  }


  defaultOption() {
    const option = new Option();

    option.backup = new Backup();
    option.backup.folder = 'umc';
    option.backup.active = false;

    option.check = new Check();
    option.check.draft = true;
    option.check.excerpt = true;
    option.check.gallery = true;
    option.check.postMeta = true;
    option.check.shortCode = true;

    option.first = true;

    option.ignore = new Ignore();
    option.ignore.sizes = [];

    option.show = new Show();
    option.show.ignoreList = true;
    option.show.used = true;

    return option;
  }

}
