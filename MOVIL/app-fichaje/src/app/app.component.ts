import { Component, inject, OnInit } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    StatusBar.setOverlaysWebView({ overlay: false });
  }

  toastController = inject(ToastController);

  constructor() {
    setTimeout(() => {
      this.showToast();
    }, 1000);
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: 'Toast desde AppComponent',
      duration: 3000,
    });
    await toast.present();
  }

}
