import {Component} from '@angular/core';
import {DirectoryService} from '../../services/directory.service';
import {LogService} from '../../services/log.service';
import {VerifyService} from '../../services/verify.service';
import {Files} from '../../models/files.model';
import {get, size} from 'lodash';

@Component({
  selector: 'umc-directories-page',
  templateUrl: './directories.page.html',
  styleUrls: ['./directories.page.scss']
})
export class DirectoriesPageComponent {

  currentDirectory?: string;
  files: Files;

  text: string;

  constructor(protected logService: LogService,
              protected directoryService: DirectoryService,
              protected verifyService: VerifyService) {

  }

  async directoryChange(directory: string) {
    if (directory) {
      this.currentDirectory = directory;
      this.text = 'charging files';
      this.files = await this.directoryService.sortFiles(directory);
      this.text = 'verifying images files';
      await this.verifyService.verify(this.files.images);
      this.text = 'verifying regulars files';
      await this.verifyService.verify(this.files.regulars);
      this.text = 'verifying orphans files';
      await this.verifyService.verify(this.files.orphans);
      this.text = null;
    } else {
      this.currentDirectory = null;
      this.files = null;
      this.logService.error('Directory can\'t be empty');
    }
  }

  haveImages() {
    return size(get(this.files, 'images')) > 0;
  }

  haveRegulars() {
    return size(get(this.files, 'regulars')) > 0;
  }

  haveOrphans() {
    return size(get(this.files, 'orphans')) > 0;
  }

  haveFiles() {
    return this.haveImages() || this.haveRegulars() || this.haveOrphans();
  }

}
