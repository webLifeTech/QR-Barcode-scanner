import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Market } from '@ionic-native/market/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AdmobfreeService } from './admobfree.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  scanningData : any = [];
  constructor(
    public alertC: AlertController,
    private market: Market,
    private socialSharing: SocialSharing,
    private clipboard: Clipboard,
    private tc: ToastController,
    private admobFree: AdmobfreeService,
  ) { }

  async resultShow(data) {
    const alert = await this.alertC.create({
      header: 'Scanning Result',
      mode:"ios",
      message: data,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.admobFree.showRewardVideo();
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Copy',
          handler: () => {
            this.copyText(data);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  appShare(){
    this.socialSharing.share(
      'QR Scanner - Barcode Scanner Downlaod, Share and Give 5 Stare Review',
      'Thank you',
      'https://play-lh.googleusercontent.com/8yM33fm7z4KOK_Hk1PYH1yCB8MqVHFM3g5eNQCZM0zW8msS5oWTqXcUuaPdQBOQyrA=s360-rw',
      'https://play.google.com/store/apps/details?id=io.ionic.qrscannerbarcodescanner'
      ).then((res) => {
      // Success!
    }).catch((error) => {
      // Error!
    })
  }

  rateApp(){
    this.market.open('io.ionic.qrscannerbarcodescanner');
  }

  copyText(value){
    this.clipboard.copy(value);
    this.presentToast('Text Copied');
    this.admobFree.showRewardVideo();
  }
  async presentToast(massege) {
    const toast = await this.tc.create({
      message: massege,
      duration: 5000
    });
    toast.present();
  }
}
