import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { faIdCard, faGraduationCap, faBriefcase, faRightFromBracket, faGear,  faCertificate, faFile, faMessage, faEarthEurope, faLightbulb, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import {loadUser, logout} from "../store/actions/auth.actions";
import {User} from "../security/user";
import {Observable, take} from "rxjs";
import {selectMyUser} from "../security/user.selector";
import {loadEducations} from "../store/actions/education.actions";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],

})
export class NavigationComponent implements OnInit {
  user$: Observable<User | null> = this.authStore.select(selectMyUser);

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
  userId: number = Number(localStorage.getItem('id') || '');

  constructor(private authService: AuthService,
              private authStore: Store<{ user: User }>
  ) {}

  ngOnInit(): void {
    this.authStore.dispatch(loadUser({id: this.userId}));
    this.isLoggedIn = !!localStorage.getItem('token');
    this.isExtendSideBar = JSON.parse(localStorage.getItem('sideBar') || 'true');
    this.user$.pipe(take(1)).subscribe();
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
    this.authStore.dispatch(logout());
  }


}
