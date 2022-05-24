import {User} from "../security/user";


export function generateSideBar(user: User | undefined): any {
  let table;
  const style = {
    firstNameHeader: {
      bold: true,
      color: 'blue',
      fontSize: 14
    },
    lastNameHeader: {
      color: 'blue',
      fontSize: 14
    },
    infoHeaders: {
      bold: true,
      color: 'blue',
      fontSize: 12
    },
    info: {
      bold: true,
      color: 'black',
      fontSize: 10
    }
  };
  // if (anonymous) {
  //     table = [
  //         {
  //             table: {
  //                 widths: [160],
  //                 body: [
  //                     [{ text: 'Jarchitects', style: style.firstNameHeader, margin: [15, 25, 15, 0] }],
  //                     [{ text: user.category, style: style.infoHeaders, margin: [15, 15, 15, 0] }],
  //                     [{ text: 'Mail.', style: style.infoHeaders, margin: [15, 15, 15, 0] }],
  //                     [{ text: user.company.contactEmail, style: style.info, margin: [15, 0, 15, 0] }],
  //                     [{ text: 'Tel.', style: style.infoHeaders, margin: [15, 15, 15, 0] }],
  //                     [{ text: user.company.telephoneNumber, style: style.info, margin: [15, 0, 15, 0] }],
  //                     [{ text: 'Address.', style: style.infoHeaders, margin: [15, 15, 3, 0] }],
  //                     [{ text: user.company.address.township, style: style.info, margin: [15, 0, 15, 0] }],
  //                     [{ text: 'LinkedIn.', style: style.infoHeaders, margin: [15, 15, 15, 0] }],
  //                     [{ text: user.company.linkedin, style: style.info, margin: [15, 0, 15, 0] }],
  //                     [{ text: 'Skills legend', style: style.infoHeaders, margin: [15, 80, 15, 0] }],
  //                     [{ text: '1: Junior', style: style.info, margin: [15, 0, 15, 0] }],
  //                     [{ text: '2: Novice', style: style.info, margin: [15, 0, 15, 0] }],
  //                     [{ text: '3: Medior', style: style.info, margin: [15, 0, 15, 0] }],
  //                     [{ text: '4: Senior', style: style.info, margin: [15, 0, 15, 0] }],
  //                     [{ text: '5: Expert', style: style.info, margin: [15, 0, 15, 0] }],
  //                 ],
  //             },
  //             layout: 'noBorders',
  //         }
  //     ];
  // } else {
  table = [
    {
      table: {
        widths: [160],
        body: [
          [{text: user?.firstname, style: style.firstNameHeader, margin: [15, 25, 15, 0]}],
          [{text: user?.lastname, style: style.lastNameHeader, margin: [15, 0, 15, 0]}],
          [{text: user?.category, style: style.infoHeaders, margin: [15, 15, 15, 0]}],
          [{text: 'Mail.', style: style.infoHeaders, margin: [15, 15, 15, 0]}],
          [{text: user?.email, style: style.info, margin: [15, 0, 15, 0]}],
          [{text: 'Tel.', style: style.infoHeaders, margin: [15, 15, 15, 0]}],
          [{text: user?.phone, style: style.info, margin: [15, 0, 15, 0]}],
          [{text: 'Address.', style: style.infoHeaders, margin: [15, 15, 15, 0]}],
          [{text: user?.city, style: style.info, margin: [15, 0, 15, 0]}],
          [{text: 'LinkedIn.', style: style.infoHeaders, margin: [15, 15, 4, 0]}],
          [{text: user?.linkedIn, style: style.info, margin: [15, 0, 15, 0]}],
          [{text: 'Skills legend', style: style.infoHeaders, margin: [15, 80, 15, 0]}],
          [{text: '1: Junior', style: style.info, margin: [15, 0, 15, 0]}],
          [{text: '2: Novice', style: style.info, margin: [15, 0, 15, 0]}],
          [{text: '3: Medior', style: style.info, margin: [15, 0, 15, 0]}],
          [{text: '4: Senior', style: style.info, margin: [15, 0, 15, 0]}],
          [{text: '5: Expert', style: style.info, margin: [15, 0, 15, 0]}],
        ],
      },
      layout: 'noBorders',
    }
  ];
  // }
  return table;
}
