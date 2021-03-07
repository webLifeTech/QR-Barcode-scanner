import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';

@Injectable({
  providedIn: 'root'
})
export class AdmobfreeService {
  isIntAdsReady : boolean = false;
  isRewardAdsReady : boolean = false;
  constructor(
    private admobFree: AdMobFree
  ) {
    // banner : ca-app-pub-8376945539001469/2773554105
    // Interstitial : ca-app-pub-8376945539001469/6993190084
    // Rewarded : ca-app-pub-8376945539001469/2922083133

    // app : ca-app-pub-8376945539001469~4278207467
  }

  adMobFreeBanner(){
    const bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-8376945539001469/2773554105',
      isTesting: true,
      autoShow: true
    };
    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare().then((res) => {
      console.log("bannerConfig>>>>>>>>>>>>>>", res);
      }).catch(e => console.log(e));
  }

  showInterstitialAds() {
    if(!this.isRewardAdsReady){
      this.isIntAdsReady = true;
      const interstitialConfig: AdMobFreeInterstitialConfig = {
        id: 'ca-app-pub-8376945539001469/6993190084',
        isTesting: true,
        autoShow: true
      };
      this.admobFree.interstitial.config(interstitialConfig);
      this.admobFree.interstitial.prepare().then((res) => {
        console.log("interstitialConfig>>>>>>>>>>>>>>", res);
          this.isIntAdsReady = false;
          this.admobFree.interstitial.show();
        }).catch(e => console.log(e));
    }else{

    }
  }  

  showRewardVideo() {
    if(!this.isIntAdsReady){
      this.isRewardAdsReady = true;
      const rewardVideoConfig: AdMobFreeRewardVideoConfig = {
        id: 'ca-app-pub-8376945539001469/2922083133',
        isTesting: true,
        autoShow: true
      };
      this.admobFree.rewardVideo.config(rewardVideoConfig);
      this.admobFree.rewardVideo.prepare().then((res) => {
        console.log("rewardVideoConfig>>>>>>>>>>>>>>", res);
        this.isRewardAdsReady = false;
          this.admobFree.rewardVideo.show();
        })
        .catch(e => console.log(e));
    }
  }
}
