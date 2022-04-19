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
import { HttpClientModule } from '@angular/common/http';
import {Router} from "@angular/router";
import {Location} from "@angular/common";



describe('EducationFormComponent', () => {
  let component: EducationFormComponent;
  let fixture: ComponentFixture<EducationFormComponent>;
  let el: HTMLElement;
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
        HttpClientModule,
        EffectsModule.forRoot([ EducationEffects]),
        EffectsModule.forFeature(),
        StoreModule.forRoot({educations: educationReducer}),
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(EducationFormComponent);
      component = fixture.componentInstance;
    });
     router = TestBed.get(Router);
     location = TestBed.get(Location);
   });


  describe('show edit form', () => {
    // it('mode should be edit', function () {
    //   fixture.detectChanges();
    //   expect(component.mode).toEqual('edit')
    // });
  })

  describe('show add form', () => {
    it('mode should be add', function () {
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
        expect(component.educationForm.valid).toBeFalsy();
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
        expect(component.educationForm.valid).toBeTruthy();
      })
    );

    it('should call the submit method', (() => {
        fixture.detectChanges();
        spyOn(component, 'onSubmit');
        el = fixture.debugElement.query(By.css('button')).nativeElement;
        el.click();
        expect(component.onSubmit).toHaveBeenCalledTimes(0)
      })
    );
  })

  describe('form submit', () => {

    it('should display alert message when onSubmit is called but is not valid',  () => {
    const fnc = spyOn(window, 'alert')
      component.onSubmit();


      expect(fnc).toHaveBeenCalledOnceWith('please fill in all required fields before submitting the form')
    });

    it('should not display alert message when onSubmit is called and is valid',  () => {
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

      const fnc = spyOn(window, 'alert');

      component.onSubmit();
      expect(fnc).not.toHaveBeenCalled();

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
