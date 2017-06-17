import { Component, Inject, OnInit } from '@angular/core'

import { FirebaseService } from '../_services/firebase.service'
import * as firebase from 'firebase/app'

import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import {
  AppState, stateAndDispatcher, state
} from '../_state'
import * as State from '../_state-partials/login.state'

@Component({
  selector: 'a-login',
  template: `
    <div>
      <h1>Login with google</h1>
      <button *ngIf="!(user | async)" (click)="signInWithGoogle()">
        Sign in with Google
      </button>
      <button *ngIf="!(user | async)" (click)="signInWithFacebook()">
        Sign in with Facebook
      </button>
      <button *ngIf="(user | async)" (click)="signOut()">
        Sign out
      </button>
      <div *ngIf="(user | async)">
        <img src="{{(user | async).photoURL}}">
        Signed in as {{(user | async).displayName}}
      </div>
    </div>
  `,
})

export class LoginComponent {
  loginDataSubscription: Subscription

  constructor(
    public firebaseService: FirebaseService,
    @Inject(state) private state: Observable<AppState>
  ) {}

  signInWithGoogle = (): void => {
    this.firebaseService.signInWithGoogle()
  }

  signInWithFacebook = (): void => {
    this.firebaseService.signInWithFacebook()
  }

  signOut = (): void => {
    this.firebaseService.signOut()
  }

  get user(): Observable<firebase.User> {
    return this.state.map(s => s.loginData.user)
  }
}
