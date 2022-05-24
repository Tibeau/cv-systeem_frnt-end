import {generateHeader} from './header.template';
import {Certificate} from "../models/certificate/certificate";
import {certfiicateIcon} from "../shared/pdfMake-images/pdfmake-util";

export function generateCertificatesTable(certificates: Certificate[] | undefined): any {
  const body: any = [];
  let table: any = [];
  const style = {
    certificateHeader: {
      bold: true,
      color: 'blue',
      fontSize: 20
    },
    certificateDateAndName: {
      bold: true,
      color: 'black',
      fontSize: 14
    },
    certificateDetails: {
      color: 'black',
      fontSize: 12
    },
  };

  if (certificates?.length !== 0) {
    certificates?.forEach(certificate => {
      body.push(
        [{
          text: `${certificate.dateEarned || ''} - ${certificate.name || ''}`,
          style: style.certificateDateAndName,
          margin: [0, 7, 0, 0]
        }],
        [{text: certificate.description, style: style.certificateDetails, margin: [0, 2, 0, 0]}]
      );
    });
    table = [
      {
        table: {
          headerRows: 1,
          body: [
            [generateHeader(certfiicateIcon, 'Certificates', style.certificateHeader)],
            [body]
          ]
        },
        layout: 'noBorders'
      }
    ];
  }
  return table;
}
