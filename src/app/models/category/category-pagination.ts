import {Category} from "./category";

export interface CategoryPagination {
  content: Category[];
  size: number;
  totalElements: number;
  totalPages: number;
  pageable: {
    pageNumber: number;
  };
}
