import {Education} from "../models/education/education";
import {generateHeader} from "./header.template";
import {educationIcon} from "../shared/pdfMake-images/pdfmake-util";

export function generateEducationsTable(educations: Education[] | undefined): any {
  const body: any = [];
  let table: any = [];
  const style = {
    educationHeader: {
      bold: true,
      color: 'blue',
      fontSize: 20
    },
    educationDateAndSchool: {
      bold: true,
      color: 'black',
      fontSize: 14
    },
    educationDegreeName: {
      color: 'black',
      fontSize: 12
    }
  };
  if (educations?.length !== 0) {
    educations?.forEach(education => {
      body.push(
        [
          {
            text: `${education.startDate || ''} - ${education.endDate || ''} ${education.school || ''}`,
            style: style.educationDateAndSchool,
            margin: [0, 7, 0, 0]
          }
        ]
      );
      body.push([{text: education.diploma, style: style.educationDegreeName, margin: [0, 2, 0, 1]}]);
    });

    table = [
      {
        table: {
          headerRows: 1,
          body: [
            [generateHeader(educationIcon, 'Education', style.educationHeader)],
            [body]
          ]
        },
        layout: 'noBorders',
      }
    ];
  }

  return table;
}
