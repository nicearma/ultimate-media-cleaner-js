import {Component, OnInit} from '@angular/core';
import {OptionService} from './services/option.service';
import {Router} from '@angular/router';

@Component({
  selector: 'umc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public optionService: OptionService,
              public router: Router) {

  }

  ngOnInit() {
    this.optionService.get();
    this.optionService.optionAsObservable().filter(o => !!o).first().subscribe((option) => {
      let route = ['/principal'];

      if (option.first) {
        route = ['/tunnel'];
      }
      this.router.navigate(route);
    });


  }
}
