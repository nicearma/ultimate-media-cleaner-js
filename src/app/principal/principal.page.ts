import {Component, OnInit} from '@angular/core';
import {VerifyFrontService} from '../services/verify-front.service';
import {concat} from 'lodash';
import {OptionService} from '../services/option.service';
import {Router} from '@angular/router';

@Component({
  selector: 'umc-page',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss']
})
export class PrincipalPageComponent implements OnInit {


  progress: number;
  complete = false;

  constructor(public verifyFrontService: VerifyFrontService,
              public router: Router) {
  }

  ngOnInit(): void {
    if (!this.complete) {
      this.router.navigate(['/principal']);
    }

  }

  async startAction() {
    this.progress = 50;
    await this.verifyFrontService.loadHtmlShortCodes();
    this.progress += 50;
    this.complete = true;
    this.router.navigate(['/principal/directories']);
  }


}
