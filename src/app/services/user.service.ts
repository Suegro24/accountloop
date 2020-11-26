import { Injectable, OnDestroy } from '@angular/core';
import { ConnectionService } from './connection.service';
import { User } from '../models/user';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId = localStorage.getItem('user');

  constructor(private conn: ConnectionService) { }

  getUsers() {
    return this.conn.http.get(this.conn.url + '/users');
  }

  uploadProfilePhoto(id: number, profilePhoto: File) {
    return this.conn.http.post(this.conn.url + `/users/changeprofileimage/${id}`, profilePhoto);
  }

  addUser(user: User) {
    return this.conn.http.post<any>(this.conn.url + '/users', user);
  }

  getUser(id: string) {
    return this.conn.http.get<User>(this.conn.url + `/users/${id}`);
  }

  loginUser(email: string, password: string) {
    return this.conn.http.post<any>(this.conn.url + '/users/login', {
      email,
      password
    });
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

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  saveSettings(id: string, settings: Settings) {
    return this.conn.http.put(this.conn.url + `/users/edit-settings/${id}`, settings);
  }

  playNotificationsSound() {
    if (!localStorage.getItem('user')) {
      const audio = new Audio();
      audio.src = '../../assets/sounds/notification.mp3';
      audio.load();
      audio.volume = 0.5;
      audio.play();
    }
    else {
      this.getUser(this.userId).subscribe(res => {
        if (res.settings.notificationsSound === true) {
          const audio = new Audio();
          audio.src = '../../assets/sounds/notification.mp3';
          audio.load();
          audio.volume = res.settings.notificationVolume;
          audio.play();
        }
      });
    }
  }

  restartPassword(user) {
    return this.conn.http.get(this.conn.url + `/users/restore-password/${user._id}`);
  }

  blockUser(user) {
    return this.conn.http.put(this.conn.url + `/users/block-user/${user._id}`, user);
  }

  unblockUser(user) {
    return this.conn.http.put(this.conn.url + `/users/unblock-user/${user._id}`, user);
  }

  getUserBudgetGoals(id: string) {
    return this.conn.http.get(this.conn.url + `/users/budget-goals/${id}`);
  }

  addBudgetGoal(goal, userId) {
    return this.conn.http.post(this.conn.url + `/users/add-goal/${userId}`, goal);
  }

  updateBudgetGoal(goal, userId, money) {
    return this.conn.http.put(this.conn.url + `/users/update-goal/${userId}`, {
      goal,
      money
    });
  }

  changePassword(userId, password, newPassword) {
    return this.conn.http.put(this.conn.url + `/users/change-password/${userId}`, {
      password,
      newPassword
    });
  }

  changeOnlineStatus(userId) {
    return this.conn.http.put(this.conn.url + `/users/change-online-status/${userId}`, null);
  }

  getUserStatus(userId) {
    return this.conn.http.get(this.conn.url + `/users/status/${userId}`);
  }

  sendMoney(expenseUserId, expense, incomeUserId, income) {
    return this.conn.http.put(this.conn.url + `/users/send-money`, {
      expenseUserId,
      expense,
      incomeUserId,
      income
    });
  }

  editGoal(userId, goal) {
    return this.conn.http.put(this.conn.url + `/users/edit-goal/${userId}`, goal);
  }

  deleteGoal(userId, goal) {
    return this.conn.http.put(this.conn.url + `/users/delete-goal/${userId}`, goal);
  }
}
