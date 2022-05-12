import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Certificate} from "../../models/certificate/certificate";
import {filter, Observable, shareReplay, take} from "rxjs";
import {map} from "rxjs/operators";
import {selectMyCertificates} from "../certificate.selector";
import {addCertificate, changeCertificate} from "../../store/actions/certificate.actions";

@Component({
  selector: 'app-certificate-form',
  templateUrl: './certificate-form.component.html',
  styleUrls: ['./certificate-form.component.scss']
})
export class CertificateFormComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  mode: string = "";
  certificateId: number = 0;
  certificate$: Observable<Certificate | undefined> = this.certificateStore.select(selectMyCertificates)
    .pipe(map(certificates => certificates?.content.find(certificate => certificate.id == this.certificateId)));
  certificateId$: Observable<number | undefined> = this.route.params.pipe(shareReplay(), map(params => params['id']))
  candidateId: number = Number(localStorage.getItem("CANDIDATE"));
  currentPage = 0;
  isCancel: boolean = false;
  certificateUrl: string = "/certificates"
  certificates: Certificate[] = [];


  certificateForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    description: [''],
    length: ['', Validators.required],
    dateEarned: ['', Validators.required],
    active: [true, Validators.required],
    candidateId: [this.candidateId, Validators.required]
  })

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private certificateStore: Store<{ certificates: Certificate[] }>) {
  }

  ngOnInit(): void {

    console.log(
      'Activated route data in Component:::',
      this.activatedRoute.data
    );
    this.activatedRoute.data.subscribe((response: any) => {
      console.log('Certificate FETCHING', response);
      this.certificates = response.certificates;
      console.log('Certificate FETCHED');
    });

    this.certificateId$.pipe(take(1)).subscribe();
    this.route.params.pipe(take(1)).subscribe((params: Params) => this.certificateId = params['id']);


    if (this.certificateId) {
      this.mode = "edit";
      this.certificate$.pipe(
        filter((certificate): certificate is Certificate => certificate !== undefined),
        take(1)).subscribe((certificate) => {
        this.certificateForm.setValue({...certificate})
      });
    } else {
      this.mode = "add";
    }
  }


  onSubmit(): void {
    if (!this.certificateForm.valid && !this.isCancel) {
      window.alert("please fill in all required fields before submitting the form");
    } else {
      if (this.mode === "add") {
        this.certificateStore.dispatch(addCertificate({certificate: this.certificateForm.value}));
      } else if (this.mode === "edit") {
        this.certificateStore.dispatch(changeCertificate({
          certificate: this.certificateForm.value,
          id: this.certificateId
        }));
      }
      this.router.navigate([this.certificateUrl]);
    }
  }

  cancel() {
    this.isCancel = true
    this.router.navigate([this.certificateUrl]);
  }

}
