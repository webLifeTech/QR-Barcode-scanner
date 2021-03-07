import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { HistoryPage } from '../history/history.page';
import { QrCodePage } from '../qr-code/qr-code.page';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  iamgeArry : any = [];
  constructor(
    private mc: ModalController,
    private barcodeScanner : BarcodeScanner,
    public gs : GlobalService
  ) {}
  goQRorBarCode(label){
    this.qrCode();
    let options : BarcodeScannerOptions = {
      prompt : label,
      showFlipCameraButton: true,
      showTorchButton: true,
      disableAnimations: true,
      disableSuccessBeep: true,
    }
    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Barcodedata<<<<<<<<<<<'+ JSON.stringify(barcodeData));
      this.gs.scanningData.push(barcodeData);
      localStorage.setItem('scanData', JSON.stringify(this.gs.scanningData));
      this.mc.dismiss();
      setTimeout(() => {
        this.gs.resultShow(barcodeData.text);
      }, 200);
     }).catch(err => {
         console.log('Error', err);
     });
  }

  async qrCode() {
    const modal = await this.mc.create({
      component: QrCodePage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async history() {
    const modal = await this.mc.create({
      component: HistoryPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
