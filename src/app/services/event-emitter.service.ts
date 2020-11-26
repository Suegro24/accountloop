import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeSidenavComponentFunction = new EventEmitter();
  subscription: Subscription;

  constructor() { }

  invokeSidenavRefreshListFunction() {
    this.invokeSidenavComponentFunction.emit();
  }
  
}
