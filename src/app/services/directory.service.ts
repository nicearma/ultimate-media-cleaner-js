import {HttpClient} from '@angular/common/http';
import {WpCall} from '../models/wp-call.model';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Directory} from '../models/directory.model';
import {Verification} from '../models/verification.model';
import {DirectoryFiles} from '../models/directory-files.model';
import {UmcService} from './umc.service';
import {FileService} from './file.service';
import {Files} from '../models/files.model';
import {size, get, values} from 'lodash';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DirectoryService extends UmcService {

  constructor(public http: HttpClient,
              protected fileService: FileService) {
    super();
  }

  getDirectories(): Observable<Directory> {
    return this.http
      .post(window['ajaxurl'], {}, WpCall.get('umc_directory_search_directory'))
      .map(res => this.handlerResponse(res));
  }

  getFiles(directory = ''): Observable<DirectoryFiles> {
    return this.http
      .post(window['ajaxurl'], {directory: directory}, WpCall.get('umc_directory_search_file'))
      .map(res => this.handlerResponse(res))
  }

  getSimpleFiles(directory = ''): Observable<DirectoryFiles> {
    return this.http
      .post(window['ajaxurl'], {directory: directory}, WpCall.get('umc_directory_search_simple_file'))
      .map(res => this.handlerResponse(res))
  }

  sortFiles(directory = ''): Promise<Files> {

    const sortFilesResult = new Promise<Files>(async (resolve) => {


      const directoryFiles = await this.getSimpleFiles(directory).toPromise();
      const files = values(directoryFiles.files);

      const subjectFile = new Subject<string>();
      const observaleFile$ = subjectFile.asObservable();
      let i = 0;


      const sortFiles = new Files();
      const images = {};

      observaleFile$.subscribe({
        next: async (file) => {

          const sortFile = await this.fileService.findId(file, directoryFiles.directory).toPromise();

          if (sortFile.id) {

            if (this.isImage(sortFile)) {
              images[sortFile.id] = sortFile;
            } else {
              sortFiles.regulars.push(sortFile);
            }
          } else {
            sortFiles.orphans.push(sortFile);
          }

          i++;
          if (i < files.length) {
            subjectFile.next(files[i]);
          } else {
            subjectFile.complete();
          }

        }, complete: () => {
          sortFiles.images = values(images);
          console.log(sortFiles);
          resolve(sortFiles);
        }

      });

      if (size(files) > 0) {
        subjectFile.next(<string> files[i]);
        return;
      }

      resolve(sortFiles);

    });

    return sortFilesResult;

  }

  isImage(file) {
    if (size(file.sizes) > 0 || file.sizeName) {
      return true;
    }
  }

  delete(src: string): Observable<Verification> {
    return this.http
      .post(window['ajaxurl'], {src}, WpCall.get('umc_directory_delete'))
      .map(res => this.handlerResponse(res));
  }

  deleteFile(src: string): Observable<Verification> {
    return this.http
      .post(window['ajaxurl'], {src}, WpCall.get('umc_directory_delete_file'))
      .map(res => this.handlerResponse(res));
  }



}
