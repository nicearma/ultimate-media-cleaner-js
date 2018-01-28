import {Component, Input} from '@angular/core';
import {BackupService} from '../../../services/backup.service';
import {BackupComponent} from '../backup.component';

@Component({
  selector: 'umc-backup-regulars',
  templateUrl: './backup-regulars.component.html',
  styleUrls: ['./backup-regulars.component.scss']
})
export class BackupRegularsComponent extends BackupComponent {

  constructor(public backupService: BackupService) {
    super(backupService);
  }

  async restore(directory: string) {
    await this.backupService.restoreRegular(directory).toPromise();
    this.splice(directory);
  }

  ngOnInit(): void {
    this.type = 'regulars';
  }

}
