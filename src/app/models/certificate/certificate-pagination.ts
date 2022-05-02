import {Certificate} from "./certificate";

export interface CertificatePagination {
  content: Certificate[];
  size: number;
  totalElements: number;
  totalPages: number;
  pageable: {
    pageNumber: number;
  };
}
