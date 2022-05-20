import { Component, OnInit } from '@angular/core';
import {logout} from "../../store/actions/auth.actions";
import {Store} from "@ngrx/store";
import {User} from "../../security/user";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private authStore: Store<{ user: User }>) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authStore.dispatch(logout());
  }

}
