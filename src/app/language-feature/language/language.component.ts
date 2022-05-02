import { Component, OnInit } from '@angular/core';
import {filter, Observable, take} from "rxjs";
import { faPencil, faTrashCan, faXmark, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';

import {LanguagePagination} from "../../models/language/language-pagination";
import {selectMyLanguages} from "../../language-feature/language.selector";
import {Language} from "../../models/language/language";
import {map} from "rxjs/operators";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {changeLanguage, loadLanguages, removeLanguage} from "../../store/actions/language.actions";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  languages$: Observable<LanguagePagination | null> = this.languageStore.select(selectMyLanguages);
  myLanguages$: Observable<Language[]> = this.languages$.pipe(
    filter((languages): languages is LanguagePagination => languages !== undefined),
    map(languages => languages?.content));

  faPencil = faPencil
  faTrashCan = faTrashCan
  faXmark = faXmark
  faTriangleExclamation = faTriangleExclamation;

  active: boolean = false;
  showModal: boolean = false;

  currentPage = 0;
  pageAmountSub$: Observable<number> = this.languages$.pipe(
    filter((language): language is LanguagePagination => language !== undefined),
    map(languages => languages?.totalPages));
  pageAmount: number = 0;

  languageForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    reading: ['', Validators.required],
    writing: ['', Validators.required],
    speaking: ['', Validators.required],
    nativeLanguage: [false, Validators.required],
    active: [false, Validators.required],
    candidateId: ['', Validators.required]
  })

  constructor(private router: Router, private fb: FormBuilder, private languageStore: Store<{ languages: LanguagePagination }>) {
  }

  ngOnInit(): void {
    this.languageStore.dispatch(loadLanguages({page: this.currentPage}));
    this.myLanguages$.pipe(take(1)).subscribe();
    this.pageAmountSub$.subscribe((page:number) => {this.pageAmount = page})
  }

  onEdit(language: Language) {
    this.router.navigate([`/languageform/${language.id}`]);
  }
  onAdd(){
    this.router.navigate(['/languageform']);
  }

  onRemove(myId: number) {
    this.showModal = false;
    this.languageStore.dispatch(removeLanguage({id: myId}));
  }

  showDeleteModal(myLanguage: Language){
    this.languageForm.setValue(myLanguage);
    this.showModal = true;
  }

  closeDeleteModal(modal: boolean){
    this.showModal = modal;
  }

  toggleActive(myLanguage: Language){
    this.active = myLanguage.active
    this.languageForm.setValue(myLanguage)
    this.active = !this.active;
    this.languageForm.patchValue({ active: this.active })
    this.languageStore.dispatch(changeLanguage({language: this.languageForm.value, id: myLanguage.id}));
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.languageStore.dispatch(loadLanguages({page: this.currentPage}));
  }

}
