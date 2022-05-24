import {Language} from "../models/language/language";
import {generateHeader} from "./header.template";
import {languageIcon} from "../shared/pdfMake-images/pdfmake-util";

export function generateLanguagesTable(languages: Language[] | undefined): any {
  let table: any = [];
  const style = {
    languageHeader: {
      bold: true,
      color: 'blue',
      fontSize: 20
    }
  };
  if (languages?.length !== 0) {
    table = [
      {
        table: {
          widths: [300],
          headerRows: 1,
          body: [
            [generateHeader(languageIcon, 'Languages', style.languageHeader)],
            [generateLanguageColumns(languages)]
          ]
        },
        layout: 'noBorders',
        margin: [10, 0, 0, 0]
      },
    ];
  }

  return table;
}

function generateLanguageColumns(languages: Language[] | undefined): any {
  const body: any = [];
  const style = {
    language: {
      bold: true,
      fontSize: 14
    }
  };

  languages?.forEach(language => {
    body.push(
      [{
        columnGap: 0,
        columns: [
          {
            width: 150,
            text: language.name,
            margin: [0, 7, 0, 0],
            style: style.language
          },
          {
            width: 150,
            text: language.speaking,
            margin: [0, 7, 0, 0],
            style: style.language
          }
        ]
      }]
    );
  });

  return body;
}
