import {Component, OnInit} from '@angular/core';
import {filter, Observable, take} from "rxjs";
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
  faMessage,
  faPencil,
  faPeopleGroup,
  faPrint,
  faRightFromBracket,
  faTrashCan,
  faTriangleExclamation,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import {map} from "rxjs/operators";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {UserPagination} from "../../../models/user/user-pagination";
import {User} from "../../../security/user";
import {loadCandidates} from "../../../store/actions/user.actions";
import {selectMyCandidates} from "../../../selectors/user.selector";
import {candidateId} from "../../../selectors/auth.selector";
import {changeNewUser} from "../../../store/actions/auth.actions";


@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  candidates$: Observable<UserPagination | null> = this.userStore.select(selectMyCandidates);
  myCandidates$: Observable<User[]> = this.candidates$.pipe(
    filter((candidates): candidates is UserPagination => candidates !== undefined),
    map(candidates => candidates?.content));


  faPencil = faPencil;
  faTrashCan = faTrashCan;
  faXmark = faXmark;
  faTriangleExclamation = faTriangleExclamation;

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
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faPeopleGroup = faPeopleGroup;
  faPrint = faPrint;

  selected: boolean = false;
  active: boolean = false;


  userForm = this.fb.group({
    id: ["",],
    candidateId: [0],
    companyId: [0],
    email: ["", Validators.required,],
    username: [""],
    phone: ["",],
    password: [""],
    firstname: [""],
    lastname: [""],
    country: [""],
    category: [""],
    street: [""],
    city: [""],
    description: [""],
    linkedIn: [""],
    imgUrl: [""],
    driversLicence: [""],
    role: ["CANDIDATE",],
    token: [""],
    number: [""],
    postalCode: [""],
    firstLogin: [true],
    active: [false,],
  })


  currentCandidate: number = Number(candidateId)

  currentPage = 0;
  pageAmountSub$: Observable<number> = this.candidates$.pipe(
    filter((candidate): candidate is UserPagination => candidate !== undefined),
    map(candidates => candidates?.totalPages));
  pageAmount: number = 0;

  constructor(private router: Router, private fb: FormBuilder, private userStore: Store<{ users: UserPagination }>, private authStore: Store<{ candidate: User }>) {
  }

  ngOnInit(): void {
    this.userStore.dispatch(loadCandidates({page: this.currentPage, items: 12}));
    this.myCandidates$.pipe(take(1)).subscribe();
    this.pageAmountSub$.subscribe((page: number) => {
      this.pageAmount = page
    })

    this.isSelected()
  }


  selectCandidate(candidateId: number | undefined) {
    console.log('getting user ', candidateId)
    if (this.currentCandidate != candidateId) {
      localStorage.setItem('Candidate', JSON.stringify(candidateId) || "")
    } else {
      localStorage.removeItem('Candidate')
    }
    window.location.reload()
  }

  isSelected() {
    if (!!this.currentCandidate) {
      this.selected = true
    } else {
      this.selected = false
    }
  }

  // print(candidateId: number | undefined) {
  //
  // }

  toggleActive(candidate: User) {
    this.active = candidate.active
    this.userForm.setValue(candidate)
    this.active = !this.active;
    this.userForm.patchValue({active: this.active})
    this.authStore.dispatch(changeNewUser({user: this.userForm.value, id: Number(candidate.id)}));
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.userStore.dispatch(loadCandidates({page: this.currentPage, items: 12}));
  }

}
