import {Component, OnInit} from '@angular/core';
import {
  faAngleLeft,
  faAngleRight,
  faBrain,
  faBriefcase,
  faCertificate,
  faEarthEurope,
  faFile,
  faGear,
  faGraduationCap,
  faIdCard,
  faMailForward,
  faMessage,
  faPeopleGroup,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import {Store} from '@ngrx/store';
import {loadUser, logout} from "../store/actions/auth.actions";
import {User} from "../security/user";
import {Observable, take} from "rxjs";
import {selectMyUser} from "../selectors/auth.selector";
import {Router} from "@angular/router";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],

})
export class NavigationComponent implements OnInit {
  user$: Observable<User | null> = this.authStore.select(selectMyUser);

  faMailForward = faMailForward
  faBrain = faBrain;
  faEarthEurope = faEarthEurope;
  faMessage = faMessage;
  faIdCard = faIdCard;
  faGraduationCap = faGraduationCap;
  faBriefcase = faBriefcase;
  faRightFromBracket = faRightFromBracket;
  faGear = faGear;
  faCertificate = faCertificate;
  faFile = faFile;
  faAngleLeft = faAngleLeft
  faAngleRight = faAngleRight
  faPeopleGroup = faPeopleGroup

  isLoggedIn: boolean = false;
  isShownNav: boolean = false; // hidden by default
  isExtendSideBar: boolean = true;
  userId: number = 0;
  role: String = ';'

  constructor(public router: Router,
              private authStore: Store<{ user: User }>
  ) {
  }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('user' || ''));
    this.isLoggedIn = !!localStorage.getItem('token');
    this.isExtendSideBar = JSON.parse(localStorage.getItem('sideBar') || 'true');
    this.authStore.dispatch(loadUser({id: this.userId}));
    this.user$.pipe(take(1)).subscribe();
  }

  closeNav() {
    this.isShownNav = false;
  }

  openNav() {
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
