import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import { EducationFormComponent } from '../../education-feature/education-form/education-form.component';
import {EducationComponent} from "../../education-feature/education/education.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import {EffectsModule} from "@ngrx/effects";
import {EducationEffects} from "../../store/effects/education.effects";
import {StoreModule} from "@ngrx/store";
import {educationReducer} from "../../store/reducers/education.reducers";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthEffects} from "../../store/effects/auth.effects";
import {authReducer} from "../../store/reducers/auth.reducers";
import {LoginComponent} from "./login.component";



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>
  let element: HTMLElement;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        EducationComponent,
        EducationFormComponent,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(
          [{path: 'educationform', component: EducationFormComponent},
            {path: 'educationform/:id', component: EducationFormComponent},]
        ),
        HttpClientTestingModule,
        EffectsModule.forRoot([AuthEffects, EducationEffects]),
        EffectsModule.forFeature(),
        StoreModule.forRoot({educations: educationReducer, user: authReducer}),
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

describe('load login screen', () => {
  it('should set login to true on load', () => {
    expect(component.isLogin).toBe(false)

    fixture.detectChanges();

    expect(component.isLogin).toBe(true)
  });
})

  describe('submit login', () => {
    it('should send user to state on submit success ', () => {

    });
  })

});
