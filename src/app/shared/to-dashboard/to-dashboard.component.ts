import {Component, Input, OnInit} from '@angular/core';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {filter, Observable, take} from "rxjs";
import {User} from "../../security/user";
import {selectMyUser} from "../../security/user.selector";
import {Store} from "@ngrx/store";
import {UserPagination} from "../../models/candidate/candidate-pagination";
import {selectMyCandidates} from "../../dashboard-feature/company/candidates/candidate.selector";
import {map} from "rxjs/operators";
import {loadCandidates} from "../../store/actions/candidate.actions";


@Component({
  selector: 'app-to-dashboard',
  templateUrl: './to-dashboard.component.html',
  styleUrls: ['./to-dashboard.component.scss']
})
export class ToDashboardComponent implements OnInit {

  @Input() title = "";

  candidates$: Observable<UserPagination | null> = this.candidateStore.select(selectMyCandidates);
  myCandidate$: Observable<User | undefined> = this.candidates$.pipe(
    filter((candidates): candidates is UserPagination => candidates !== undefined),
    map(candidates => candidates?.content.find(candidate => candidate.id == (localStorage.getItem('CANDIDATE')))));



  faArrowLeft = faArrowLeft;

  constructor( private candidateStore: Store<{candidate : User[]}>
  ) { }

  ngOnInit(): void {
    this.candidateStore.dispatch(loadCandidates({page: 0, items: 999999999}));
    this.myCandidate$.pipe(take(1)).subscribe();
  }

}