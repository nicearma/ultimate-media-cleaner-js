import {File} from '../../models/file.model';
import {FileStatus} from '../../consts/file-status.const';
import {RxComponent} from './rx.component';
import {FileService} from '../../services/file.service';
import {OptionService} from '../../services/option.service';
import {BackupService} from '../../services/backup.service';
import {OnInit} from '@angular/core';

export abstract class BasicComponent extends RxComponent implements OnInit {

  backup = false;

  constructor(protected optionService: OptionService) {
    super();
  }

  ngOnInit() {
    this.push(this.optionService.optionAsObservable().subscribe((option) => {
      this.backup = option.backup.active;
    }));
  }

  canDelete(file: File): boolean {
    return file.status === FileStatus.not_used;
  }

  abstract delete(file: File);

}
