import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../models/category/category";
import {CategoryPagination} from "../../models/category/category-pagination";
import {Observable} from "rxjs";
import {CertificatePagination} from "../../models/certificate/certificate-pagination";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  api = environment.API_URL;
  BASE_URL = this.api + '/categories';

  constructor(private httpClient: HttpClient) {
  }

  createCategory(category: Category) {
    return this.httpClient.post<Category>(`${this.BASE_URL}`, category);
  }

  putCategory(category: Category, id: number) {
    return this.httpClient.put<Category>(`${this.BASE_URL}/${id}`, category);
  }

  loadCategories( page: number, items: number): Observable<CategoryPagination> {
    return this.httpClient.get<CategoryPagination>(`${this.BASE_URL}/page=${page}/items=${items}`
    );
  }

  deleteCategory(id: number) {
    return this.httpClient.delete<Category>(`${this.BASE_URL}/${id}`);
  }
}
