import {Component, OnInit} from '@angular/core';
import {BackupService} from '../../services/backup.service';
import {Directory} from '../../models/directory.model';
import {RxComponent} from '../basic/rx.component';
import {size, get} from 'lodash';


@Component({
  selector: 'umc-backup-page',
  templateUrl: './backup.page.html',
  styleUrls: ['./backup.page.scss']
})
export class BackupPageComponent extends RxComponent implements OnInit {

  imageDirectory: Directory;
  regularDirectory: Directory;
  orphanDirectory: Directory;

  constructor(public backupService: BackupService) {
    super();
  }

  ngOnInit(): void {
    this.push(this.backupService.getImages().subscribe((imageDirectory) => {
      this.imageDirectory = imageDirectory;
    }));

    this.push(this.backupService.getRegulars().subscribe((regularDirectory) => {
      this.regularDirectory = regularDirectory;
    }));

    this.push(this.backupService.getOrphans().subscribe((orphanDirectory) => {
      this.orphanDirectory = orphanDirectory;
    }));
  }


  haveSize(array) {
    return size(array) > 0;
  }


}
