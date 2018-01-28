import {Component, Input, OnInit} from '@angular/core';
import {File} from '../../models/file.model';
import {values, size, find} from 'lodash';
import {BasicComponent} from '../basic/basic.component';
import {FileService} from '../../services/file.service';
import {FileStatus} from '../../consts/file-status.const';
import {OptionService} from '../../services/option.service';
import {BackupService} from '../../services/backup.service';

@Component({
  selector: 'umc-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent extends BasicComponent implements OnInit {


  @Input()
  images: Array<File>;

  ignoredSizes: Array<string>;

  constructor(protected fileService: FileService,
              protected backupService: BackupService,
              protected optionService: OptionService) {
    super(optionService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.push(this.optionService.optionAsObservable().subscribe((option) => {
      this.ignoredSizes = option.ignore.sizes;
    }));
  }

  canDelete(image: File) {
    const canDeleteImage = super.canDelete(image);
    if ((this.ignoredSizes.indexOf(image.sizeName) > -1) || !canDeleteImage) {
      return false;
    }

    const imageSizeFound = find(image.sizes, (imageSize) => {
      return imageSize.status === FileStatus.used || (this.ignoredSizes.indexOf(imageSize.sizeName) > -1);
    });
    return canDeleteImage && !imageSizeFound;
  }

  canDeleteSize(image: File, imageSize: File) {
    return !(this.ignoredSizes.indexOf(imageSize.sizeName) > -1)
      && this.canDelete(imageSize)
      && (image.status === FileStatus.not_used || image.status === FileStatus.used);
  }

  getImageSizes(sizes: Array<File>) {
    return values(sizes);
  }

  async delete(file: File) {
    file.status = FileStatus.aking_backup;
    if (this.backup) {
      // TODO: try catch
      await this.backupService.image(file.id, file.sizeName).toPromise();
    }

    file.status = FileStatus.erasing;
    const verification = await this.fileService.deleteImage(file.id, file.type, file.name).toPromise();
    file.status = verification.status;
    const imagesSizes = values(verification.sizes);
    imagesSizes.forEach((imageSize) => {
      console.log(imageSize.sizeName, file.sizes[imageSize.sizeName]);
      file.sizes[imageSize.sizeName].status = verification.status;
    });
  }

  async deleteSize(file: File) {
    file.status = FileStatus.aking_backup;
    if (this.backup) {
      // TODO:
      await this.backupService.image(file.id, file.sizeName).toPromise();
    }
    file.status = FileStatus.erasing;
    const verification = await this.fileService.deleteImage(file.id, file.type, file.name, file.sizeName).toPromise();
    file.status = verification.status;
  }


}
