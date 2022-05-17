import { Component, OnInit } from '@angular/core';
import {filter, Observable, take} from "rxjs";
import {Language} from "../../models/language/language";
import {selectMyLanguages} from "../../selectors/language.selector";
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {map} from "rxjs/operators";
import {FormBuilder, Validators} from "@angular/forms";
import {candidateId} from "../../selectors/auth.selector";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {addLanguage, changeLanguage} from "../../store/actions/language.actions";

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.scss']
})
export class LanguageFormComponent implements OnInit {
  language$: Observable<Language | undefined> = this.languageStore.select(selectMyLanguages)
    .pipe(map(languages => languages?.content.find(language => language.id == this.languageId)));

  faArrowLeft = faArrowLeft;
  mode: string = "";
  languageId: number = 0;
  currentPage = 0;
  isCancel: boolean = false;
  languageUrl: string = "/languages"

  languageForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    reading: ['', Validators.required],
    writing: ['', Validators.required],
    speaking: ['', Validators.required],
    nativeLanguage: [false, Validators.required],
    active: [true, Validators.required],
    candidateId: [candidateId, Validators.required]
  })

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private languageStore: Store<{ languages: Language[] }>) {
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params: Params) => this.languageId = params['id']);


    if (this.languageId) {
      this.mode = "edit";
      this.language$.pipe(
        filter((language): language is Language => language !== undefined),
        take(1)).subscribe((language) => {
        this.languageForm.setValue({...language})
      });
    } else {
      this.mode = "add";
    }
  }

  onSubmit(): void {
      if (this.languageForm.value.nativeLanguage) {
        this.languageForm.patchValue({
          reading: 'C2(Mastery)',
          writing: 'C2(Mastery)',
          speaking: 'C2(Mastery)',
        }
        )
      }
      if ( this.mode === "add") {
        this.languageStore.dispatch(addLanguage({language: this.languageForm.value}));
      } else if (this.mode === "edit") {
        this.languageStore.dispatch(changeLanguage({language: this.languageForm.value, id: this.languageId}));
      }
      this.router.navigate([this.languageUrl]);
  }

  cancel(){
    this.isCancel = true
    this.router.navigate([this.languageUrl]);
  }


}
