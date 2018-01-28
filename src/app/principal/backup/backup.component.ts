import {BackupService} from '../../services/backup.service';
import {Input, OnInit} from '@angular/core';

export abstract class BackupComponent implements OnInit {

  @Input()
  directories: Array<string>;

  type: string;


  constructor(public backupService: BackupService) {

  }

  async delete(directory: string) {
    await this.backupService.delete(directory, this.type).toPromise();
    this.splice(directory);
  }

  abstract restore(directory: string);

  splice(directory) {
    const index = this.directories.indexOf(directory);
    if (index > -1) {
      this.directories.splice(index, 1);
    }
  }

  abstract ngOnInit(): void;

}
