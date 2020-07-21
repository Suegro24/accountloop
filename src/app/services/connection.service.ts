import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  public url = "http://localhost:8000";

  constructor(public http: HttpClient) { }
}
