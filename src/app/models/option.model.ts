import {Check} from './options/check.model';
import {Show} from './options/show.model';
import {Backup} from './options/backup.model';
import {Ignore} from './options/ignore.model';

export class Option {
  check: Check;
  show: Show;
  backup: Backup;
  ignore: Ignore;
  first: boolean;
}
