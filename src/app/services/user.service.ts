import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn: boolean = localStorage.getItem('user') ? true : false;

  constructor(private conn: ConnectionService) { }

  getUsers() {
    return this.conn.http.get(this.conn.url + '/users');
  }

  addUser(user: User) {
    return this.conn.http.post<User>(this.conn.url + '/users', user);
  }

  getUser(id: number) {
    return this.conn.http.get<User>(this.conn.url + `/users/${id}`);
  }

  editUser(id: string, user: User) {
    return this.conn.http.put<User>(this.conn.url + `/users/${id}`, user);
  }

  changeBudgetUser(id: string, user: User) {
    return this.conn.http.put<User>(this.conn.url + `/users/${id}/changebudget`, user);
  }

  joinFirm(id: string, user: User) {
    return this.conn.http.put<User>(this.conn.url + `/users/joinfirm/${id}`, user);
  }

  acceptUserToFirm(id: string) {
    return this.conn.http.put(this.conn.url + `/users/acceptUserToFirm/${id}`, null);
  }

  discardUserToFirm(id: string) {
    return this.conn.http.put(this.conn.url + `/users/discardUserToFirm/${id}`, null);
  }

  deleteUserFromFirm(id: string) {
    return this.conn.http.put(this.conn.url + `/users/${id}/deleteUserFromFirm`, null);
  }

  changeUserPermissions(id: string, status: number) {
    return this.conn.http.put(this.conn.url + `/users/${id}/changePermissions/${status}`, null);
  }

  leaveFirm(id: string) {
    return this.conn.http.put(this.conn.url + `/users/leaveFirm/${id}`, null);
  }
}
