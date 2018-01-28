import {File} from './file.model';

export class Files {

  images: Array<File>;
  regulars: Array<File>;
  orphans: Array<File>;

  constructor() {
    this.images = [];
    this.regulars = [];
    this.orphans = [];
  }

}
