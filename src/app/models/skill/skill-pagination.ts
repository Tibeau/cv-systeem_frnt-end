import {Skill} from "./skill";

export interface SkillPagination {
  content: Skill[];
  size: number;
  totalElements: number;
  totalPages: number;
  pageable: {
    pageNumber: number;
  };
}
