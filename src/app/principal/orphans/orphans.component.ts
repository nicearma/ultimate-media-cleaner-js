import {Component, Input} from '@angular/core';
import {File} from '../../models/file.model';
import {values, size} from 'lodash';
import {BasicComponent} from '../basic/basic.component';
import {FileService} from '../../services/file.service';
import {FileType} from '../../consts/file-type.const';
import {DirectoryService} from '../../services/directory.service';
import {BackupService} from '../../services/backup.service';
import {OptionService} from '../../services/option.service';
import {FileStatus} from '../../consts/file-status.const';

@Component({
  selector: 'umc-orphans',
  templateUrl: './orphans.component.html',
  styleUrls: ['./orphans.component.scss']
})
export class OrphansComponent extends BasicComponent {

  @Input()
  orphans: Array<File>;

  constructor(protected directoryService: DirectoryService,
              protected backupService: BackupService,
              protected optionService: OptionService) {
    super(optionService);
  }

  canDelete(file: File) {
    return super.canDelete(file) && file.type !== FileType.unknown;
  }

  async delete(file: File) {

    file.status = FileStatus.aking_backup;

    if (this.backup) {
      await this.backupService.orphan(file.src, file.name).toPromise();
    }
    file.status = FileStatus.erasing;
    await this.directoryService.deleteFile(file.src).toPromise();
    file.status = FileStatus.deleted;
    const index = this.orphans.indexOf(file);
    if (index > 0) {
      this.orphans.splice(index, 1);
    }

  }

}
