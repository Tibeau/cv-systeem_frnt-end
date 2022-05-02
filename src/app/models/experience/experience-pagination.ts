import {Experience} from "./experience";

export interface ExperiencePagination {
  content: Experience[];
  size: number;
  totalElements: number;
  totalPages: number;
  pageable: {
    pageNumber: number;
  };
}
