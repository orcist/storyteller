import { Observable } from 'rxjs/Observable'

import * as firebase from 'firebase/app'

export class AppState {
  user: firebase.User
}

export const initState: AppState = {
  user: null,
}

export type Action = (
  AuthUpdateAction
)

export class AuthUpdateAction {
  user: firebase.User

  constructor(
    user: firebase.User
  ) {
    this.user = user
  }
}

export const observe = (
  (initState: AppState, actions: Observable<Action>): Observable<any> => actions.scan(
    (state: AppState, action: Action) => {
      if (action instanceof AuthUpdateAction) {
        return {
          ...state,

          user: action.user,
        }
      } else {
        return {
          ...state,
        }
      }
    },
    initState
  )
)
