import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  addCatURL: string;
  getCatURL: string;
  updateCatUrl: string;
  deleteCatUrl: string;

  constructor(private http: HttpClient) {
    this.addCatURL = 'http://localhost:3000/cat/addCategory';
    this.getCatURL = 'http://localhost:3000/cat/getAll';
    this.updateCatUrl = 'http://localhost:3000/cat/updateCategory';
    this.deleteCatUrl = 'http://localhost:3000/cat/deleteCategoryById';
  }

  addCategory(cat: Category): Observable<Category> {
    return this.http.post<Category>(this.addCatURL, cat);
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.getCatURL);
  }

  updateCategory(cat: Category): Observable<Category> {
    return this.http.put<Category>(this.updateCatUrl, cat);
  }

  deleteCategory(cat: Category): Observable<Category> {
    return this.http.delete<Category>(this.deleteCatUrl + '/' + cat.id);
  }
}
