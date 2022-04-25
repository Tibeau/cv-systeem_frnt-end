import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { faIdCard, faGraduationCap, faBriefcase, faRightFromBracket, faGear,  faCertificate, faFile, faMessage, faEarthEurope, faLightbulb, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import {logout} from "../store/actions/auth.actions";
import {User} from "../security/user";


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
  faAngleLeft= faAngleLeft
  faAngleRight =faAngleRight

  isLoggedIn: boolean = false;
  isShownNav: boolean = false; // hidden by default
  isExtendSideBar: boolean = true;

  constructor(private authService: AuthService,
              private store: Store<{ user: User }>
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isExtendSideBar = JSON.parse(localStorage.getItem('sideBar') || 'true');
  }

  closeNav() {
    this.isShownNav = false;
  }

  openNav(){
    this.isShownNav = true;
  }

  toggleSideBar() {
    this.isExtendSideBar = !this.isExtendSideBar;
    localStorage.setItem('sideBar', JSON.stringify(this.isExtendSideBar));
  }

  logOut(): void {
    this.store.dispatch(logout());
  }

}
