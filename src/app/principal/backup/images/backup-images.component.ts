import {Component, Input} from '@angular/core';
import {BackupService} from '../../../services/backup.service';
import {BackupComponent} from '../backup.component';

@Component({
  selector: 'umc-backup-images',
  templateUrl: './backup-images.component.html',
  styleUrls: ['./backup-images.component.scss']
})
export class BackupImagesComponent extends BackupComponent  {

  constructor(public backupService: BackupService) {
    super(backupService);
  }

  async restore(directory: string) {
    await this.backupService.restoreImage(directory).toPromise();
    this.splice(directory);
  }

  ngOnInit(): void {
    this.type = 'images';
  }


}
