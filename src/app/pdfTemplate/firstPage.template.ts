import {User} from "../security/user";
import {defaultProfilePicture} from "../shared/pdfMake-images/pdfmake-util";

export function generateFirstPage(user: User | undefined): any {
  let table = [];
  let profile = defaultProfilePicture;
  // if (user?.imgUrl != "") {
  //   profile = 'data:image/jpeg;base64,' + user?.imgUrl;
  // }

  const styles = {
    fullName: {
      fontSize: 24,
      bold: true,
      color: 'blue'
    },
    positionCompany: {
      fontSize: 20,
      bold: true,
      color: 'blue'
    },
    subHeader: {
      fontSize: 20,
      bold: true,
    },
    info: {
      bold: true,
      color: 'blue',
      fontSize: 14
    }
  };
  // if (anonymous) {
  //   table = [
  //     {
  //       image: profile, fit: [123.84, 123.84],
  //       absolutePosition: { x: 410, y: 20 }
  //     },
  //     {
  //       table: {
  //         widths: [414, 414, 414, 414, 414, 414, 414, 414, 414],
  //         body: [
  //           [{
  //             text: `${user.company.name}`, style: styles.fullName, margin: [25, 50, 5, 5]
  //           }],
  //           [{ text: user.positionCompany, style: styles.positionCompany, margin: [25, 0, 5, 5] }],
  //           [{
  //             canvas: [
  //               { type: 'line', x1: 25, y1: 0, x2: 360, y2: 0, lineWidth: 2, lineColor: 'blue' }
  //             ]
  //           }],
  //           [{ text: 'About', style: styles.subHeader, margin: [25, 0, 5, 5] }],
  //           [{ text: user.aboutMe, margin: [25, 0, 10, 5] }],
  //           [{ text: 'Contact Information', style: styles.subHeader, margin: [25, 10, 5, 5] }],
  //           [{ text: `Mail. ${user.company.contactEmail}`, style: styles.info, margin: [25, 0, 5, 3] }],
  //           [{ text: `Tel. ${user.company.telephoneNumber}`, style: styles.info, margin: [25, 0, 5, 3] }],
  //           [{ text: `Address. ${user.company.address.township}`, style: styles.info, margin: [25, 0, 5, 3] }],
  //           [{ text: `LinkedIn. ${user.company.linkedin}`, style: styles.info, margin: [25, 0, 5, 20] }]
  //         ]
  //       },
  //       fillColor: 'white',
  //       layout: 'noBorders',
  //       margin: [385, 100, 0, 0],
  //       pageBreak: 'after',
  //     }
  //   ];
  // } else {
  table = [
    {
      image: profile, width: 123.84, height: 123.84,
      absolutePosition: {x: 410, y: 20}
    },
    {
      table: {
        widths: [414, 414, 414, 414, 414, 414, 414, 414, 414],
        body: [
          [{
            text: `${user?.firstname} ${user?.lastname}`, style: styles.fullName, margin: [25, 50, 5, 5]
          }],
          [{text: user?.category, style: styles.positionCompany, margin: [25, 0, 5, 5]}],
          [{
            canvas: [
              {type: 'line', x1: 25, y1: 0, x2: 360, y2: 0, lineWidth: 2, lineColor: 'blue'}
            ]
          }],
          [{text: `About ${user?.firstname}`, style: styles.subHeader, margin: [25, 0, 5, 5]}],
          [{text: user?.description, margin: [25, 0, 10, 5]}],
          [{text: 'Contact Information', style: styles.subHeader, margin: [25, 10, 5, 5]}],
          [{text: `Mail. ${user?.email}`, style: styles.info, margin: [25, 0, 5, 3]}],
          [{text: `Tel. ${user?.phone || ''}`, style: styles.info, margin: [25, 0, 5, 3]}],
          [{text: `Address. ${user?.city || ''}`, style: styles.info, margin: [25, 0, 5, 3]}],
          [{text: `LinkedIn. ${user?.linkedIn || ''}`, style: styles.info, margin: [25, 0, 5, 20]}]
        ]
      },
      fillColor: 'white',
      layout: 'noBorders',
      margin: [385, 100, 0, 0],
      pageBreak: 'after',
    }
  ];
  // }
  return table;
}
