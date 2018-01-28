import {Component, Input} from '@angular/core';
import {BackupService} from '../../../services/backup.service';
import {BackupComponent} from '../backup.component';

@Component({
  selector: 'umc-backup-orphans',
  templateUrl: './backup-orphans.component.html',
  styleUrls: ['./backup-orphans.component.scss']
})
export class BackupOrphansComponent extends BackupComponent {

  constructor(public backupService: BackupService) {
    super(backupService);
  }

  async restore(directory: string) {
    await this.backupService.restoreOrphan(directory).toPromise();
    this.splice(directory);
  }

  ngOnInit(): void {
    this.type = 'orphans';
  }

}
