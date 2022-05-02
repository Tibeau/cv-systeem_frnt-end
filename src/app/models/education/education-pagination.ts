import {Education} from "./education";

export interface EducationPagination {
  content: Education[];
  size: number;
  totalElements: number;
  totalPages: number;
  pageable: {
    pageNumber: number;
  };
}
