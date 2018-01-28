import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DirectoryService} from '../../../services/directory.service';
import {Directory} from '../../../models/directory.model';

@Component({
  selector: 'umc-directories-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {

  directory?: Directory;

  @Output()
  onDirectoryChanged = new EventEmitter<string>();

  constructor(public directoryService: DirectoryService) {

  }

  async ngOnInit() {
    this.directory = await this.directoryService.getDirectories().toPromise();
  }

  directoryChange(directory) {
    console.log(directory);
    this.onDirectoryChanged.emit(directory);
  }

}
