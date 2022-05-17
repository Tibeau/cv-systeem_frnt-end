import {User} from "../../security/user";

export interface UserPagination {
  content: User[];
  size: number;
  totalElements: number;
  totalPages: number;
  pageable: {
    pageNumber: number;
  };
}
