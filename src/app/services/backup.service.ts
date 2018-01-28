import {Injectable} from '@angular/core';
import {UmcService} from './umc.service';
import {HttpClient} from '@angular/common/http';
import {WpCall} from '../models/wp-call.model';
import {Observable} from 'rxjs/Rx';
import {Count} from '../models/count.model';
import {Status} from '../models/status.model';
import {Verification} from '../models/verification.model';
import {Directory} from '../models/directory.model';

@Injectable()
export class BackupService extends UmcService {

  constructor(public http: HttpClient) {
    super();
  }

  create(): Observable<void> {
    return this.http
      .post(window['ajaxurl'], {}, WpCall.get('umc_backup_create'))
      .map(res => this.handlerResponse(res));
  }

  verifyFolder(): Observable<Status> {
    return this.http
      .post(window['ajaxurl'], {}, WpCall.get('umc_backup_verify'))
      .map(res => this.handlerResponse(res));
  }

  image(id: number, sizeName: string): Observable<void> {
    return this.http
      .post(window['ajaxurl'], {id, sizeName}, WpCall.get('umc_backup_image'))
      .map(res => this.handlerResponse(res));
  }

  regular(id: number): Observable<void> {
    return this.http
      .post(window['ajaxurl'], {id}, WpCall.get('umc_backup_regular'))
      .map(res => this.handlerResponse(res));
  }

  orphan(src: string, name: string): Observable<void> {
    return this.http
      .post(window['ajaxurl'], {src, name}, WpCall.get('umc_backup_orphan'))
      .map(res => this.handlerResponse(res));
  }

  restoreImage(id: string): Observable<Verification> {
    return this.http
      .post(window['ajaxurl'], {id}, WpCall.get('umc_backup_restore_image'))
      .map(res => this.handlerResponse(res));
  }

  restoreRegular(id: string): Observable<Verification> {
    return this.http
      .post(window['ajaxurl'], {id}, WpCall.get('umc_backup_restore_regular'))
      .map(res => this.handlerResponse(res));
  }

  restoreOrphan(directory: string): Observable<Verification> {
    return this.http
      .post(window['ajaxurl'], {directory}, WpCall.get('umc_backup_restore_orphan'))
      .map(res => this.handlerResponse(res));
  }

  getImages(): Observable<Directory> {
    return this.http
      .post(window['ajaxurl'], {}, WpCall.get('umc_backup_get_images'))
      .map(res => this.handlerResponse(res));
  }

  getRegulars(): Observable<Directory> {
    return this.http
      .post(window['ajaxurl'], {}, WpCall.get('umc_backup_get_regulars'))
      .map(res => this.handlerResponse(res));
  }

  getOrphans(): Observable<Directory> {
    return this.http
      .post(window['ajaxurl'], {}, WpCall.get('umc_backup_get_orphans'))
      .map(res => this.handlerResponse(res));
  }

  delete(directory, type): Observable<Directory> {
    return this.http
      .post(window['ajaxurl'], {directory, type}, WpCall.get('umc_backup_delete'))
      .map(res => this.handlerResponse(res));
  }

}
