import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { AdmobfreeService } from './services/admobfree.service';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  constructor(
    private platform: Platform,
    private router: Router,
    private admobS: AdmobfreeService,
    private gs: GlobalService,
  ) {
    this.initializeApp();
    this.gs.scanningData = localStorage.getItem('scanData') != null ? JSON.parse(localStorage.getItem('scanData')) : [];
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else if (this.router.url) {
        navigator['app'].exitApp();
      } else {

       }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.admobS.showInterstitialAds();
      this.admobS.adMobFreeBanner();
      // let updateURL = new URL("https://play.google.com/store/apps/details?id=com.lifetechs.agecalculator");
    });
  }
}
