import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{

  candidate: boolean = false;
  company: boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.candidate = !!localStorage.getItem('CANDIDATE')
    this.company = !!localStorage.getItem('COMPANY')

  }




}
