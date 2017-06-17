import { OpaqueToken } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import './_package-extensions/rxjs-extensions'

import * as LoginState from './_state-partials/login.state'

export type Action = (
  LoginState.Action
)

export class AppState {
  loginData: LoginState.AppState

  constructor() {}
}

export const initState = new OpaqueToken('initState')
export const dispatcher = new OpaqueToken('dispatcher')
export const state = new OpaqueToken('state')

const stateFn = (initState: AppState, actions: Observable<Action>): Observable<AppState> => {
  const combine = (login) => {
    return ({
      loginData: login,
    })
  }

  const appStateObs: Observable<AppState> = Observable.zip(
      LoginState.observe(LoginState.initState, actions),

      combine
    )

  const res = new BehaviorSubject(initState)
  appStateObs
    .subscribe(s => res.next(s))

  return res
}

export const stateAndDispatcher = [
  {
    provide: initState,
    useValue: {
      loginData: LoginState.initState,
    },
  },
  {
    provide: dispatcher,
    useValue: new Subject<Action>()
  },
  {
    provide: state,
    useFactory: stateFn,
    deps: [ initState, dispatcher ]
  }
]
