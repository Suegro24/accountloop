import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private conn: ConnectionService) { }

  getCategory(name) {
    return this.conn.http.get<Category>(this.conn.url + `/categories/${name}`);
  }

  getAllCategories() {
    return this.conn.http.get(this.conn.url + '/categories');
  }

  addCategory(category) {
    return this.conn.http.post(this.conn.url + '/categories/create', category);
  }

  updateCategory(category) {
    return this.conn.http.put(this.conn.url + '/categories/update', category);
  }

  chooseCategory(name) {
    return this.conn.http.get<number>(this.conn.url + `/categories/choose-category/${name}`);
  }

  deleteCategory(category) {
    return this.conn.http.delete(this.conn.url + `/categories/delete/${category._id}`);
  }


}
