import { Component, OnInit } from '@angular/core';

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import {Store} from "@ngrx/store";
import {EducationPagination} from "../../models/education/education-pagination";
import {filter, Observable, take} from "rxjs";
import {selectMyEducations} from "../../education-feature/education.selector";
import {Education} from "../../models/education/education";
import {map} from "rxjs/operators";
import {loadEducations} from "../../store/actions/education.actions";


@Component({
  selector: 'app-cv-template',
  templateUrl: './cv-template.component.html',
  styleUrls: ['./cv-template.component.scss']
})
export class CvTemplateComponent implements OnInit {
  educations$: Observable<EducationPagination | null> = this.educationStore.select(selectMyEducations);
  myEducations$: Observable<Education[]> = this.educations$.pipe(
    filter((education): education is EducationPagination => education !== undefined),
    map(educations => educations?.content));

  constructor( private educationStore: Store<{ educations: EducationPagination }>) { }

  ngOnInit(): void {
    this.educationStore.dispatch(loadEducations({page: 0}));
    this.myEducations$.pipe(take(1)).subscribe();
  }

  exportHtmlToPDF(){
    const data = document.getElementById('htmltable') ;

    html2canvas(data!).then(canvas => {

      let docWidth = 210;
      let docHeight = (canvas.height * docWidth / canvas.width);

      const contentDataURL = canvas.toDataURL('image/png')
      let doc = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      doc.addImage(contentDataURL, 'pdf', 0, position, docWidth, docHeight)

      doc.save('exportedPdf.pdf');
    });
  }

}
