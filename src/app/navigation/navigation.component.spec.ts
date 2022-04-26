import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import { EducationFormComponent } from '../education-feature/education-form/education-form.component';
import {EducationComponent} from "../education-feature/education/education.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import {EffectsModule} from "@ngrx/effects";
import {EducationEffects} from "../store/effects/education.effects";
import {StoreModule} from "@ngrx/store";
import {educationReducer} from "../store/reducers/education.reducers";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthEffects} from "../store/effects/auth.effects";
import {authReducer} from "../store/reducers/auth.reducers";
import {NavigationComponent} from "./navigation.component";



describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>
  let element: HTMLElement;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        NavigationComponent,
        EducationComponent,
        EducationFormComponent,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(
          [ { path: 'educationform', component: EducationFormComponent },
            { path: 'educationform/:id', component: EducationFormComponent },]
        ),
        HttpClientTestingModule,
        EffectsModule.forRoot([AuthEffects, EducationEffects]),
        EffectsModule.forFeature(),
        StoreModule.forRoot({educations: educationReducer, user: authReducer}),
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(NavigationComponent);
      component = fixture.componentInstance;
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  describe('show navigation if user is logged in' , () => {
    it('should be logged in when token is not null',  () => {
      localStorage.setItem('token', "token code string")

      fixture.detectChanges()

      expect(component.isLoggedIn).toBe(true)
    });

    it('should not be logged in when token is null',  () => {
      localStorage.clear()

      fixture.detectChanges()

      expect(component.isLoggedIn).toBe(false)
    });

    describe('extended sidebar', () =>{
      it('sidebar should show if extendSideBar is true', () => {
        localStorage.setItem('sideBar', "true")

        fixture.detectChanges()

        expect(component.isExtendSideBar).toBe(true)

      });

      it('sidebar should not show if extendSideBar is false', () => {
        localStorage.setItem('sideBar', "false")

        fixture.detectChanges()

        expect(component.isExtendSideBar).toBe(false)

      });

      it('should toggle sidebar on toggle sidebar button', () => {
        let bar = component.isExtendSideBar;

        component.toggleSideBar()

        expect(component.isExtendSideBar).toBe(!bar)

      });
    })

  })
  describe('small screen navigation', () => {
    it('should close nav on close nav button and open on open nav button', () => {
      expect(component.isShownNav).toBe(false);
      component.openNav()
      expect(component.isShownNav).toBe(true);
      component.closeNav()
      expect(component.isShownNav).toBe(false);

    });
  })
  describe('log out button', () => {
    it('should set isLogged in to false', () => {

      component.logOut()

      expect(component.isLoggedIn).toBe(false)
    });
  })

});














