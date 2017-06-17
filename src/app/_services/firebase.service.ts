import { Inject, Injectable } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import { Subscription } from 'rxjs/Subscription'

import {
  AppState, Action, stateAndDispatcher, state, dispatcher
} from '../_state'
import * as State from '../_state-partials/login.state'

import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase/app'

@Injectable()
export class FirebaseService {
  user: Observable<firebase.User>

  constructor(
    public firebaseAuth: AngularFireAuth,
    @Inject(state) private state: Observable<AppState>,
    @Inject(dispatcher) private dispatcher: Observer<Action>
  ) {}

  initialize = (): void => {
    this.firebaseAuth.authState.subscribe(
      authState => {
        const action = new State.AuthUpdateAction(authState)
        this.dispatcher.next(action)
      }
    )
  }

  signInWithGoogle = (): void => {
    this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  signInWithFacebook = (): void => {
    this.firebaseAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  }

  signOut = (): void => {
    this.firebaseAuth.auth.signOut()
  }
}
