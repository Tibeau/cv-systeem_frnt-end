import { Component, OnInit } from '@angular/core';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cv-systeem';

  constructor(private ngxFavicon: AngularFaviconService) {}

  ngOnInit() {
    this.ngxFavicon.setFavicon("../assets/logo_round.png");
  }

}
