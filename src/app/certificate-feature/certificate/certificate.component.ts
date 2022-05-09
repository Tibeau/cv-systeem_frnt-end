import { Component, OnInit } from '@angular/core';
import { faPencil, faTrashCan, faXmark, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {CertificatePagination} from "../../models/certificate/certificate-pagination";
import {filter, Observable, take} from "rxjs";
import {map} from "rxjs/operators";
import {Certificate} from "../../models/certificate/certificate";
import {selectMyCertificates} from "../certificate.selector";
import {changeCertificate, loadCertificates, removeCertificate} from "../../store/actions/certificate.actions";

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {

  faPencil = faPencil
  faTrashCan = faTrashCan
  faXmark = faXmark
  faTriangleExclamation = faTriangleExclamation;

  certificates$: Observable<CertificatePagination | null> = this.certificateStore.select(selectMyCertificates);
  myCertificates$: Observable<Certificate[]> = this.certificates$.pipe(
    filter((certificate): certificate is CertificatePagination => certificate !== undefined),
    map(certificate => certificate?.content));

  active: boolean = false;
  showModal: boolean = false;

  currentPage = 0;
  pageAmountSub$: Observable<number> = this.certificates$.pipe(
    filter((certificate): certificate is CertificatePagination => certificate !== undefined),
    map(certificates => certificates?.totalPages));
  pageAmount: number = 0;
  candidateId: number = Number(localStorage.getItem("id"));


  certificateForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    length: ['', Validators.required],
    dateEarned: ['', Validators.required],
    active: [true, Validators.required],
    candidateId: [this.candidateId, Validators.required]
  })


  constructor(private router: Router, private fb: FormBuilder, private certificateStore: Store<{ certificates: CertificatePagination }>) {
  }

  ngOnInit(): void {
    this.certificateStore.dispatch(loadCertificates({page: this.currentPage, items: 3}));
    this.myCertificates$.pipe(take(1)).subscribe();
    this.pageAmountSub$.subscribe((page:number) => {this.pageAmount = page})
  }

  onEdit(certificate: Certificate) {
    this.router.navigate([`/certificateform/${certificate.id}`]);
  }
  onAdd(){
    this.router.navigate(['/certificateform']);
  }

  showDeleteModal(myCertificate: Certificate){
    this.certificateForm.setValue(myCertificate);
    this.showModal = true;
  }

  toggleActive(myCertificate: Certificate){
    this.active = myCertificate.active
    this.certificateForm.setValue(myCertificate)
    this.active = !this.active;
    this.certificateForm.patchValue({ active: this.active })
    this.certificateStore.dispatch(changeCertificate({certificate: this.certificateForm.value, id: myCertificate.id}));
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.certificateStore.dispatch(loadCertificates({page: this.currentPage, items: 3}));
  }

  onRemove(myId: number) {
    this.showModal = false;
    this.certificateStore.dispatch(removeCertificate({id: myId}));
  }


  closeDeleteModal(modal: boolean){
    this.showModal = modal;
  }

}
