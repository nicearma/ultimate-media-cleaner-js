import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {WpCall} from '../models/wp-call.model';
import {Count} from '../models/count.model';
import {File} from '../models/file.model';
import {Verification} from '../models/verification.model';
import {Observable} from 'rxjs/Rx';
import {UmcService} from './umc.service';


@Injectable()
export class FileService extends UmcService {

  constructor(public http: HttpClient) {
    super();
  }

  countRegular(): Observable<Count> {
    return this.http
      .post(window['ajaxurl'], {}, WpCall.get('umc_file_count_regular'))
      .map(res => this.handlerResponse(res));
  }

  countImage(): Observable<Count> {
    return this.http
      .post(window['ajaxurl'], {}, WpCall.get('umc_file_count_image'))
      .map(res => this.handlerResponse(res));
  }

  getImages(page = 0, size = 20): Observable<Array<File>> {
    return this.http
      .post(window['ajaxurl'], {page, size}, WpCall.get('umc_file_get_images'))
      .map(res => this.handlerResponse(res));
  }

  getRegular(page = 0, size = 20): Observable<Array<File>> {
    return this.http
      .post(window['ajaxurl'], {page, size}, WpCall.get('umc_file_get_regulars'))
      .map(res => this.handlerResponse(res));
  }

  deleteImage(id: number, type: string, name: string, sizeName?: string): Observable<Verification> {
    return this.http
      .post(window['ajaxurl'], {id, type, name, sizeName}, WpCall.get('umc_file_delete_image'))
      .map(res => this.handlerResponse(res));
  }

  deleteRegular(id: number, name: string): Observable<Verification> {
    return this.http
      .post(window['ajaxurl'], {id, name}, WpCall.get('umc_file_delete_regular'))
      .map(res => this.handlerResponse(res));
  }

  findId(name: string, directory: string): Observable<File> {
    return this.http
      .post(window['ajaxurl'], {name, directory}, WpCall.get('umc_file_find_id'))
      .map(res => this.handlerResponse(res));
  }


}

