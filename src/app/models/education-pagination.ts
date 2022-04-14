import {Education} from "./education";

export interface EducationPagination {
  content: Education[];
  size: number;
  totalElements: number;
  pageable: {
    pageNumber: number;
  };
}
