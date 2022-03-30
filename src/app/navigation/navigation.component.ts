import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { faIdCard, faGraduationCap, faBriefcase, faRightFromBracket, faGear,  faCertificate, faFile, faMessage, faEarthEurope, faLightbulb} from '@fortawesome/free-solid-svg-icons';
import {LogOut} from "../store/actions/auth.actions";
import {AppState} from "../store/app.states";
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],

})
export class NavigationComponent implements OnInit {

  faLightbulb = faLightbulb;
  faEarthEurope = faEarthEurope;
  faMessage = faMessage;
  faIdCard = faIdCard;
  faGraduationCap = faGraduationCap;
  faBriefcase = faBriefcase;
  faRightFromBracket = faRightFromBracket;
  faGear = faGear;
  faCertificate = faCertificate;
  faFile =faFile;

  isLoggedIn: boolean = false;
  isShownNav: boolean = false; // hidden by default
  isExtendSideBar: boolean = false;

  constructor(private authService: AuthService,
              private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  closeNav() {
    this.isShownNav = false;
  }

  openNav(){
    this.isShownNav = true;
  }

  extendSideBar() {
    this.isExtendSideBar = true;
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }

}
