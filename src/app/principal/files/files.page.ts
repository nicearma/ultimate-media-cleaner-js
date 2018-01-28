import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material';
import {FileService} from '../../services/file.service';
import {VerifyService} from '../../services/verify.service';
import {forEach, get, size, values, max} from 'lodash';
import {Files} from '../../models/files.model';

@Component({
  selector: 'umc-files-page',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss']
})
export class FilesPageComponent implements OnInit {

  files: Files;
  text: string;

  count: number;
  page: number;
  size: number;

  sizeOptions: Array<number>;


  constructor(public fileService: FileService,
              public verifyService: VerifyService) {

  }

  async ngOnInit() {

    this.files = new Files();

    this.count = 0;
    this.size = 20;
    this.sizeOptions = [1, 10, 20, 100];

    await this.countAction();
    this.filesAction();
  }

  async countAction() {
    const counts = await Promise.all([this.fileService.countImage().toPromise(), this.fileService.countRegular().toPromise()]);
    this.count = max(counts.map(count => count.size));
  }

  async filesAction() {
    this.text = 'charging regular files';
    this.files.regulars = await this.fileService.getRegular(this.page, this.size).toPromise();
    this.text = 'charging images files';
    this.files.images = await this.fileService.getImages(this.page, this.size).toPromise();
    this.text = 'verifying images files';
    await this.verifyService.verify(this.files.images);
    this.text = 'verifying regular files';
    await this.verifyService.verify(this.files.regulars);
    this.text = null;
  }

  changePage(page: PageEvent) {
    this.page = page.pageIndex;
    this.size = page.pageSize;
    this.filesAction();
  }


  haveImages() {
    return size(get(this.files, 'images')) > 0;
  }

  haveRegulars() {
    return size(get(this.files, 'regulars')) > 0;
  }

  haveFiles() {
    return this.haveImages() || this.haveRegulars();
  }


}
