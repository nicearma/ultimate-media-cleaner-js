import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {WpCall} from '../models/wp-call.model';
import {File} from '../models/file.model';
import {Verification, VerificationImage} from '../models/verification.model';
import {FileStatus} from '../consts/file-status.const';
import {Subject} from 'rxjs/Rx';
import {UmcService} from './umc.service';
import {find, forEach, map, size, some} from 'lodash';
import {VerifyFrontService} from './verify-front.service';

@Injectable()
export class VerifyService extends UmcService {

  htmls: Array<string>;

  constructor(public http: HttpClient,
              public verifyFrontService: VerifyFrontService) {
    super();
    this.init();

  }

  init() {
    this.verifyFrontService.getHtmlAsObservable().subscribe((htmls) => {
      this.htmls = htmls;
    });
  }

  verify(files: Array<File>): Promise<void> {

    return new Promise<void>(resolve => {

      if (!(files.length > 0)) {
        resolve();
        return;
      }


      const subjectFile = new Subject<File>();
      let i = 0;
      const observableFile = subjectFile.asObservable();

      observableFile
        .subscribe(async (file) => {

          const status = await this.verifyCall(file);

          this.verifyHtmlShortCodes(file, this.htmls, status.status);

          // result of image sizes
          if (size(status.sizes) > 0) {
            this.verifyImageSize(status, file, this.htmls);
          }

          i = i + 1;
          if (files.length > i) {
            subjectFile.next(files[i]);
          } else {
            subjectFile.complete();
            resolve();
            return;
          }


        });

      subjectFile.next(files[i]);

    });

  }

  private verifyImageSize(status: Verification, file: File, htmls) {
    forEach(status.sizes, (verificationImage: VerificationImage) => {
      const imageSize: File = find(file.sizes, {
        name: verificationImage.name,
        sizeName: verificationImage.sizeName
      });

      this.verifyHtmlShortCodes(imageSize, htmls, verificationImage.status);
    });
  }


  verifyCall(file: File): Promise<Verification> {

    file.status = FileStatus.asking;

    const body = {id: file.id, name: file.name, sizes: null};

    // add image sizes to request
    if (size(file.sizes) > 0) {
      const sizes = map(file.sizes, (imageSize: File) => {
        imageSize.status = FileStatus.asking;
        return {id: file.id, sizeName: imageSize.sizeName, name: imageSize.name};
      });
      body.sizes = sizes;
    }
    return this.http
      .post(window['ajaxurl'], body, WpCall.get('umc_verify_file'))
      .map(res => this.handlerResponse(res)).toPromise()
  }

  verifyHtmlShortCodes(file: File, htmls: Array<string>, resultVerify: string): void {

    const have = some(htmls, (html: string) => {
      const regex = new RegExp(file.name, 'gi')
      return regex.test(html);
    });

    if (have) {
      file.status = FileStatus.used;
    } else {
      file.status = resultVerify;
    }
  }

}
