import {Component, Input} from '@angular/core';
import {File} from '../../models/file.model';
import {BasicComponent} from '../basic/basic.component';
import {DirectoryService} from '../../services/directory.service';
import {FileStatus} from '../../consts/file-status.const';
import {OptionService} from '../../services/option.service';
import {BackupService} from '../../services/backup.service';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'umc-regular',
  templateUrl: './regular.component.html',
  styleUrls: ['./regular.component.scss']
})
export class RegularComponent extends BasicComponent {


  @Input()
  regulars: Array<File>;

  constructor(protected fileService: FileService,
              protected backupService: BackupService,
              protected optionService: OptionService) {
    super(optionService);
  }


  async delete(file: File) {

    file.status = FileStatus.aking_backup;

    if (this.backup) {
      await this.backupService.regular(file.id).toPromise();
    }

    file.status = FileStatus.erasing;
    await this.fileService.deleteRegular(file.id, file.name).toPromise();
    file.status = FileStatus.deleted;

    const index = this.regulars.indexOf(file);
    if (index > 0) {
      this.regulars.splice(index, 1);
    }

  }

}
