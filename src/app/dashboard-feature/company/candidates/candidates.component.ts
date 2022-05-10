import { Component, OnInit } from '@angular/core';
import {filter, Observable, take} from "rxjs";
import {faAngleLeft, faAngleRight,faPeopleGroup,faIdCard, faGraduationCap, faBriefcase, faRightFromBracket, faGear,  faCertificate, faFile, faMessage, faEarthEurope, faBrain,faPencil, faTrashCan, faXmark, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {map} from "rxjs/operators";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {UserPagination} from "../../../models/candidate/candidate-pagination";
import {User} from "../../../security/user";
import {loadCandidates} from "../../../store/actions/candidate.actions";
import {selectMyCandidates} from "./candidate.selector";

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  candidates$: Observable<UserPagination | null> = this.candidateStore.select(selectMyCandidates);
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
  faFile =faFile;
  faAngleLeft= faAngleLeft
  faAngleRight =faAngleRight
  faPeopleGroup = faPeopleGroup

  selected: boolean = false;

  currentCandidate: number = Number(localStorage.getItem('CANDIDATE'))

  currentPage = 0;
  pageAmountSub$: Observable<number> = this.candidates$.pipe(
    filter((candidate): candidate is UserPagination => candidate !== undefined),
    map(candidates => candidates?.totalPages));
  pageAmount: number = 0;

  constructor(private router: Router, private fb: FormBuilder, private candidateStore: Store<{ candidates: UserPagination }>) {
  }

  ngOnInit(): void {
    this.candidateStore.dispatch(loadCandidates({page: this.currentPage, items: 12}));
    this.myCandidates$.pipe(take(1)).subscribe();
    this.pageAmountSub$.subscribe((page:number) => {this.pageAmount = page})

    this.isSelected()
  }

  onEdit(candidate: User) {
  }

  selectCandidate(candidateId: number | undefined){
    if (this.currentCandidate != candidateId){
      localStorage.setItem('CANDIDATE', JSON.stringify(candidateId) || "")
    } else {
      localStorage.removeItem('CANDIDATE')
    }
    window.location.reload()
  }

isSelected() {
  if (!!this.currentCandidate){
    this.selected = true
  } else {
    this.selected = false
  }
}

  pageChanged(page: number) {
    this.currentPage = page;
    this.candidateStore.dispatch(loadCandidates({page: this.currentPage, items: 12}));
  }

}
