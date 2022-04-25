import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {EducationComponent} from "./education.component";
import {BrowserModule, By} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import {EffectsModule} from "@ngrx/effects";
import {EducationEffects} from "../../store/effects/education.effects";
import {StoreModule} from "@ngrx/store";
import {educationReducer} from "../../store/reducers/education.reducers";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Education} from "../../models/education";
import {HttpClientTestingModule} from "@angular/common/http/testing";



describe('EducationFormComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;
  let el: HTMLElement;
  let location: Location;
  let router: Router;
  let education: Education = {
    active: false,
    candidateId: 1,
    country: "belgium",
    description: "some description",
    diploma: "bachelor diploma",
    endDate: "date",
    fieldOfStudy: "application development",
    id: 6,
    school: "thomasmore",
    startDate: "date",
    website: "www.example.be"
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        EducationComponent,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(
          [ { path: 'educationform', component: EducationComponent },]
        ),
        HttpClientTestingModule,
        EffectsModule.forRoot([ EducationEffects]),
        EffectsModule.forFeature(),
        StoreModule.forRoot({educations: educationReducer}),
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(EducationComponent);
      component = fixture.componentInstance;
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });



    describe('Show first education page from candidate', () => {
      describe('working edit button', () => {
      });
      describe('working toggle active button', () => {
        it('toggle active should change the active state of the education', function () {


          component.toggleActive(education)
          fixture.detectChanges()

          expect(component.active).toEqual(!education.active)
          expect(component.educationForm.value.active).toEqual(!education.active)
        });
      });
    });
    describe('working delete button',  () => {
      it('on education removal, modal should close',  ()=> {


        component.onRemove(1);


        expect(component.showModal).toEqual(false);
      });
      it('when delete button is pressed a modal should be shown', () => {


        fixture.detectChanges()
        component.showDeleteModal(education)


        expect(component.educationForm.value).toEqual(education)
        expect(component.showModal).toBeTrue()
      });

      it('close modal button should set show modal false',  () => {


        component.closeDeleteModal(false)
        fixture.detectChanges()


        expect(component.showModal).toBeFalse()
      });
    });

    describe('working add button', () => {

    });

    describe('working pagination', () => {
      it('page should become same as input',  () => {


        component.pageChanged(1)
        fixture.detectChanges()


        expect(component.currentPage).toEqual(1)
      });
    });
});
