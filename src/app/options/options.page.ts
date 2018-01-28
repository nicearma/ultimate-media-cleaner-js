import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OptionService} from '../services/option.service';
import {Option} from '../models/option.model';
import {RxComponent} from '../principal/basic/rx.component';
import {BackupService} from '../services/backup.service';

@Component({
  selector: 'umc-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss']
})
export class OptionsPageComponent extends RxComponent implements OnInit {


  option: Option;
  backupCreated = false;


  constructor(public optionService: OptionService,
              public backupService: BackupService) {
    super();
  }

  ngOnInit() {
    this.optionService.optionAsObservable().first().subscribe((option) => {
      this.option = option;
      this.verifyBackup();
    });
  }

  async verifyBackup() {
   const status = await this.backupService.verifyFolder().toPromise();
    this.backupCreated = status.result;
    if(!this.backupCreated && this.option.backup.active) {
      this.option.backup.active = false;
    }
  }

  async createBackup() {
    await this.backupService.create().toPromise();
    this.verifyBackup();
  }

  onChanges(): void {
    this.optionService.updateAndShare(this.option);
  }
}
