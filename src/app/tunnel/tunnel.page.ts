import {Component, OnInit} from '@angular/core';
import {OptionService} from '../services/option.service';
import {Router} from '@angular/router';

@Component({
  selector: 'umc-tunnel',
  templateUrl: './tunnel.page.html',
  styleUrls: ['./tunnel.page.scss']
})
export class TunnelPageComponent implements OnInit {

  status = 0;
  readonly max = 3;

  constructor(public optionService: OptionService,
              public router: Router) {
  }

  ngOnInit() {

  }

  backStatus() {

    if (this.status > 0) {
      this.status--;
    }
  }

  nextStatus() {
    if (this.status < this.max + 1) {
      this.status++;
    }
  }

  ready() {
    this.optionService.optionAsObservable().filter(o => !!o).first().subscribe((option) => {
      option.first = false;
      this.optionService.updateAndShare(option);
      this.router.navigate(['principal']);
    })
  }

}
