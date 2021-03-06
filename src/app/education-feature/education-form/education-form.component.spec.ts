import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import { EducationFormComponent } from './education-form.component';
import {EducationComponent} from "../education/education.component";
import {BrowserModule, By} from "@angular/platform-browser";
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



describe('EducationFormComponent', () => {
  let component: EducationFormComponent;
  let fixture: ComponentFixture<EducationFormComponent>;
  let element: HTMLElement;
  let location: Location;
  let router: Router;


  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
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
      fixture = TestBed.createComponent(EducationFormComponent);
      component = fixture.componentInstance;
    });
     router = TestBed.get(Router);
     location = TestBed.get(Location);
   });


  describe('show edit form', () => {
    // it('mode should be edit', function () {
    //   const router = TestBed.inject(Router);
    //
    //   spyOnProperty(router, 'url', 'get').and.returnValue('/educationForm/2')
    //
    //   fixture.detectChanges();
    //   expect(component.mode).toEqual('edit')
    // });
  })

  describe('show add form', () => {
    it('mode should be add', () => {


      fixture.detectChanges();


      expect(component.mode).toEqual('add')

    });
  })
  describe('form validation', () => {

    it('form should be invalid',  (() => {
        component.educationForm.controls['id'].setValue('');
        component.educationForm.controls['diploma'].setValue('');
        component.educationForm.controls['description'].setValue('');
        component.educationForm.controls['fieldOfStudy'].setValue('');
        component.educationForm.controls['country'].setValue('');
        component.educationForm.controls['website'].setValue('');
        component.educationForm.controls['startDate'].setValue('');
        component.educationForm.controls['endDate'].setValue('');
        component.educationForm.controls['active'].setValue('');
        component.educationForm.controls['candidateId'].setValue('');
        component.educationForm.controls['school'].setValue('');



        expect(component.educationForm.valid).toBeFalse();
      })
    );

    it('form should be valid',  (() => {
        component.educationForm.controls['id'].setValue(0);
        component.educationForm.controls['diploma'].setValue('bachelor diploma');
        component.educationForm.controls['description'].setValue('some description');
        component.educationForm.controls['fieldOfStudy'].setValue('application development');
        component.educationForm.controls['country'].setValue('belgium');
        component.educationForm.controls['website'].setValue('www.example.be');
        component.educationForm.controls['startDate'].setValue('date');
        component.educationForm.controls['endDate'].setValue('date');
        component.educationForm.controls['active'].setValue(false);
        component.educationForm.controls['candidateId'].setValue(1);
        component.educationForm.controls['school'].setValue('thomasmore');


        expect(component.educationForm.valid).toBeTrue();
      })
    );

    it('should call the submit method', (() => {
        spyOn(component, 'onSubmit');
        element = fixture.debugElement.query(By.css('button')).nativeElement;

        element.click();

        expect(component.onSubmit).toHaveBeenCalledTimes(0)
      })
    );
  })

  describe('form submit', () => {

    it('should display alert message when onSubmit is called but is not valid',  () => {
      const alert = spyOn(window, 'alert')


      component.onSubmit();


      expect(alert).toHaveBeenCalledOnceWith('please fill in all required fields before submitting the form')
    });

    it('should not display alert message when onSubmit is called and is valid',  () => {
      const alert = spyOn(window, 'alert');
      component.educationForm.controls['id'].setValue(0);
      component.educationForm.controls['diploma'].setValue('bachelor diploma');
      component.educationForm.controls['description'].setValue('some description');
      component.educationForm.controls['fieldOfStudy'].setValue('application development');
      component.educationForm.controls['country'].setValue('belgium');
      component.educationForm.controls['website'].setValue('www.example.be');
      component.educationForm.controls['startDate'].setValue('date');
      component.educationForm.controls['endDate'].setValue('date');
      component.educationForm.controls['active'].setValue(false);
      component.educationForm.controls['candidateId'].setValue(1);
      component.educationForm.controls['school'].setValue('thomasmore');


      fixture.detectChanges()
      component.onSubmit();


      expect(alert).not.toHaveBeenCalled();
    });

    // it('/educationform/2 should return educationId 2', fakeAsync(() => {
    //   router.navigate(["educationform/2"]).then(() => {
    //     fixture.detectChanges()
    //     expect(component.educationId).toEqual(2);
    //     expect(location.path()).toBe("/educationform/2");
    //   })
    // }));

    it('edit current education',  () => {

    });

  })

  describe('cancel changes', () => {

    it('cancel button pressed',  () => {


      component.cancel()
      fixture.detectChanges()


      expect(component.isCancel).toEqual(true);
    });

  })
});
