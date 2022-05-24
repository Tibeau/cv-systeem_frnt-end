import {Experience} from "../models/experience/experience";
import {generateHeader} from "./header.template";
import {experienceIcon} from "../shared/pdfMake-images/pdfmake-util";

export function generateExperiencesTable(experiences: Experience[] | undefined): any {
  let table: any = [];
  const style = {
    experienceHeader: {
      bold: true,
      color: 'blue',
      fontSize: 20
    }
  };

  if (experiences?.length !== 0) {
    table = [
      {
        table: {
          headerRows: 1,
          body: [
            [generateHeader(experienceIcon, 'Professional experience', style.experienceHeader)],
            [generateExperiences(experiences)]
          ]
        },
        layout: 'noBorders',
        pageBreak: 'before',
        margin: [0, 0, 0, 0]
      }
    ];
  }
  return table;
}

function generateExperiences(experiences: Experience[] | undefined): any {
  const body: any = [];
  const style = {
    experienceSubTitle: {
      bold: true,
      color: 'orange',
      fontSize: 14,
    },
    experienceCompany: {
      bold: true,
      color: 'orange',
      fontSize: 14,
      italics: true
    },
    experienceDetails: {
      fontSize: 12,
      color: 'black'
    },
    experienceProjectHeaders: {
      fontSize: 14,
      color: 'orange',
      bold: true
    }
  };
  experiences?.forEach(experience => {
    body.push(
      {
        stack: [
          {
            text: `${experience.startDate || ''} - ${experience.endDate || ''}
                        ${experience.profession || ''}`, style: style.experienceSubTitle,
            margin: [0, 0, 0, 3]
          },
          {text: experience.company, style: style.experienceCompany, margin: [0, 0, 0, 7]},
          {text: experience.description, margin: [0, 0, 0, 15], style: style.experienceDetails},
          {text: 'Project Description', style: style.experienceProjectHeaders},
          {text: experience.description, margin: [0, 0, 0, 15]},
          {text: 'Tools:', style: style.experienceProjectHeaders},
          // { text: experience.projectTools,  margin: [0, 0, 0, 30] }
        ]
      });
  });

  return body;
}

// TODO: delete if not used.
/*function generateExperienceColumn1(experiences: ExperienceModel[]): any {
    const table = [];

    for (let i = 0; i < experiences.length; i += 2) {
        const experience = experiences[i];
        table.push(
            [
                {
                    table: {
                        body: [
                            [generateExperiences(experience)]
                        ]
                    },
                    layout: 'noBorders',
                    margin: [0, 0, 50, 0]
                }
            ]
        );

    }
    return table;
}

function generateExperienceColumn2(experiences: ExperienceModel[]): any {
    const table = [];

    for (let i = 1; i < experiences.length; i += 2) {
        const experience = experiences[i];
        table.push(
            [
                {
                    table: {
                        body: [
                            [generateExperiences(experience)]
                        ]
                    },
                    layout: 'noBorders'
                }
            ]
        );

    }
    return table;
}

function generateExperiences(experience: ExperienceModel): any {
    const style = {
        experienceSubTitle: {
            bold: true,
            color: 'orange',
            fontSize: 13
        },
        experienceCompany: {
            bold: true,
            color: 'orange',
            fontSize: 13,
            italics: true
        },
        experienceDetails: {
            fontSize: 12,
            color: 'black'
        }
    };

    const body = [
        {
            stack: [
                {
                    text: `${experience.startDate} - ${experience.endDate} ${experience.jobRole}`, style: style.experienceSubTitle,
                    margin: [0, 0, 0, 3]
                },
                { text: experience.company, style: style.experienceCompany, margin: [0, 0, 0, 7] },
                { text: experience.jobDescription, margin: [0, 0, 0, 15], style: style.experienceDetails }
            ],
            unbreakable: true,
        }
    ];

    return body;
}*/
