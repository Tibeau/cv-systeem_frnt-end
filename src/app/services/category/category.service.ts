import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../models/category/category";

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

  loadCategories() {
    return this.httpClient.get<Category[]>(`${this.BASE_URL}`);
  }

  deleteCategory(id: number) {
    return this.httpClient.delete<Category>(`${this.BASE_URL}/${id}`);
  }
}
