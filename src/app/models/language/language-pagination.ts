import {Language} from "./language";

export interface LanguagePagination {
  content: Language[];
  size: number;
  totalElements: number;
  totalPages: number;
  pageable: {
    pageNumber: number;
  };
}
