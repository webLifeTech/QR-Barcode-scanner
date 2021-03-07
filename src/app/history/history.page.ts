import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { GlobalService } from '../services/global.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AdmobfreeService } from '../services/admobfree.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  constructor(
    public gs : GlobalService,
    public admobFree : AdmobfreeService,
    public mc : ModalController,
    public act : ActionSheetController,
    private socialSharing: SocialSharing,
  ) {
    console.log("gs.scanningData"+JSON.stringify(this.gs.scanningData));
  }

  ngOnInit() {
  }

  async presentAct(data,index) {
    const actionSheet = await this.act.create({
      header: 'Options',
      buttons: [
        {
        text: 'Copy',
        role: 'destructive',
        icon: 'copy-outline',
        handler: () => {
          this.gs.copyText(data.text);
          console.log('Delete clicked');
        }
      }, {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash-outline',
        handler: () => {
          this.admobFree.showInterstitialAds();
          this.gs.scanningData.splice(index,1)
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share-social-outline',
        handler: () => {
          console.log('Share clicked');
          this.shareData(data.text);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  shareData(data){
    this.socialSharing.share(
    data,
    '',
    '',
    '').then((res) => {
      console.log("res>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+res);
      // Success!
      this.admobFree.showInterstitialAds();
    }).catch((error) => {
      // Error!
    })
  }

}
