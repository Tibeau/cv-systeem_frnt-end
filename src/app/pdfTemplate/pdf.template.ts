import {generateSideBar} from './sidebar.template';
import {generateFirstPage} from './firstPage.template';
import {generateLanguagesTable} from './language.template';
import {generateExperiencesTable} from './experience.template';
import {generateSkillsTable} from './skills.template';
import {generateCertificatesTable} from './certificate.template';
import {generateEducationsTable} from './education.template';

import {User} from "../security/user";
import {Education} from "../models/education/education";
import {Skill} from "../models/skill/skill";
import {Language} from "../models/language/language";
import {Experience} from "../models/experience/experience";
import {Certificate} from "../models/certificate/certificate";
import {backgroundCvImage} from "../shared/pdfMake-images/pdfmake-util";


export function generateTemplate(user: User | undefined, educations: Education[] | undefined, certificates: Certificate[] | undefined, experiences: Experience[] | undefined, languages: Language[] | undefined, skills: Skill[] | undefined
): any {

  const pageWidth = 822.240;
  const pageHeight = 595.276;
  const docDefinition = {
    info: {
      title: 'Resume',
    },
    pageSize: {
      width: pageWidth,
      height: pageHeight
    },
    header: {
      image: backgroundCvImage, fit: [72, 72],
      absolutePosition: {x: 715, y: 8}
    },
    pageMargins: [0, 0, 0, 0],
    background: (currentPage: any) => {
      if (currentPage === 1) {
        const background = [
          {
            image: backgroundCvImage,
            width: pageWidth,
            height: pageHeight
          }
        ];
        return background;
      }
      return [
        {
          table: {
            heights: [pageHeight - 4],
            body: [
              [generateSideBar(user)]
            ]
          },
          layout: 'noBorders'
        },
        {
          canvas: [
            {
              type: 'rect',
              x: 160, y: -pageHeight, w: pageWidth, h: pageHeight,
              color: '#f0eefc'
            }
          ]
        }
      ];
    },
    content: [
      generateFirstPage(user),
      {
        table: {
          body: [
            [
              {
                table: {
                  widths: [300],
                  body: [
                    [generateEducationsTable(educations)],
                    [generateCertificatesTable(certificates)],
                    [generateSkillsTable(skills)]
                  ]
                },
                layout: 'noBorders'
              },
              generateLanguagesTable(languages)
            ]
          ]
        },
        margin: [185, 0, 0, 0],
        layout: 'noBorders',
      },
      {
        table: {
          widths: [600],
          body: [
            [generateExperiencesTable(experiences)]
          ]
        },
        margin: [185, 0, 0, 0],
        layout: 'noBorders',
      }
    ]
  };

  return docDefinition;
}
