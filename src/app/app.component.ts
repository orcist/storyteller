import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

import { FirebaseService } from './_services/firebase.service'

@Component({
  selector: 'a-app-root',
  template: `
    <div>
      <a-login></a-login>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent implements OnInit {
  constructor(
    public firebaseService: FirebaseService,
  ) {}

  ngOnInit(): void {
    this.firebaseService.initialize()
  }
}
