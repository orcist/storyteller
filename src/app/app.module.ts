import { environment } from '../environments/environment'

import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database'

import { stateAndDispatcher } from './_state'
import { FirebaseService } from './_services/firebase.service'

import { AppComponent } from './app.component'
import { LoginComponent } from './views/login.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    ...stateAndDispatcher,
    FirebaseService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
