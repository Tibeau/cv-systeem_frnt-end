import {Component, OnInit} from '@angular/core';
import {candidateId} from "../../selectors/auth.selector";
import {companyId} from "../../selectors/auth.selector";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  candidate: boolean = !!candidateId;
  company: boolean = !!companyId;


  constructor() {
  }

  ngOnInit(): void {

  }


}
