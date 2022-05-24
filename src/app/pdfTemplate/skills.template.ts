import {generateHeader} from './header.template';
import {Skill} from "../models/skill/skill";
// import {fullStarIcon, skillsIcon, starOutlineIcon} from "../shared/pdfMake-images/pdfmake-util";

export function generateSkillsTable(skills: Skill[] | undefined): any {
  let table: any = [];
  const style = {
    skillHeader: {
      bold: true,
      color: 'blue',
      fontSize: 20
    }
  };
  if (skills?.length !== 0) {
    table = [
      {
        table: {
          widths: [300, 300],
          headerRows: 1,
          body: [
            // [generateHeader(skillsIcon, 'Skills', style.skillHeader), ''],
            [generateSkillsColumn1(skills), generateSkillsColumn2(skills)]
          ]
        },
        layout: 'noBorders',
        pageBreak: 'before',
        margin: [0, 0, 0, 0],
      }
    ];
  }
  return table;
}

function generateSkillsColumn1(skills: Skill[] | undefined): any {
  const table = [];
  if (skills != undefined)
    for (let i = 0; i < skills.length; i += 2) {
      const skill = skills[i];
      table.push(
        [{
          columnGap: 0,
          columns: generateSkillWithStars(skill.score, skill.name)
        }]
      );
    }

  return table;
}

function generateSkillsColumn2(skills: Skill[] | undefined): any {
  const table = [];
  if (skills != undefined)
    for (let i = 1; i < skills.length; i += 2) {
      const skill = skills[i];
      table.push(
        [{
          columnGap: 0,
          columns: generateSkillWithStars(skill.score, skill.name)
        }]
      );
    }
  return table;
}

function generateSkillWithStars(score: number, name: string): any {
  const stars = [];
  const style = {
    bold: true,
    fontSize: 14
  };
  stars.push({text: name, width: 175, margin: [0, 7, 0, 0], style});
  if (score !== 0) {
    for (let i = 0; i < 5; i++) {
      if (score !== 0) {
        stars.push({
          // image: fullStarIcon, width: 15, height: 15, margin: [0, 7, 0, 0]
        });
        score = score - 1;
      } else {
        stars.push({
          // image: starOutlineIcon, width: 15, height: 15, margin: [0, 7, 0, 0]
        });
      }
    }
  }

  /*let rest = score - Math.floor(score);
  score = Math.floor(score);

  for (let i = 0; i < 5; i++) {
      if (score !== 0) {
          stars.push({
              image: fullStarIcon, width: 15, height: 15, margin: [0, 7, 0, 0]
          });
          score = score - 1;
      } else if (score === 0 && rest !== 0) {
          stars.push({
              image: halfStarIcon, width: 15, height: 15, margin: [0, 7, 0, 0]
          });
          rest = 0;
      } else {
          stars.push({
              image: starOutlineIcon, width: 15, height: 15, margin: [0, 7, 0, 0]
          });
      }
  }*/
  return stars;
}
