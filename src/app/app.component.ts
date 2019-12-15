import { Component } from '@angular/core';
import {ClickerConfigModel} from './shared/models/clicker.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clicker';
  tears = 0;

  configs: ClickerConfigModel[] = [{
    title: 'HTML',
    collectValue: 1,
    timeToCollect: 5,
    upgradeCost: 5,
    upgradeRatio: 1.4,
    collectRatio: 1.1,
    developerConst: 40,
    isDeveloperHired: false,
    openComponentConst: 0,
    isComponentOpened: true,
    loadingImage: 'https://media.giphy.com/media/l1J9xCZo3aw9QRxsY/giphy.gif',
  }, {
    title: 'CSS',
    collectValue: 10,
    timeToCollect: 60,
    upgradeCost: 50,
    upgradeRatio: 1.3,
    collectRatio: 1.3,
    developerConst: 70,
    isDeveloperHired: false,
    openComponentConst: 30,
    isComponentOpened: false,
    loadingImage: 'https://media.giphy.com/media/l49JNurXQRqzoZPFe/giphy.gif',
  }, {
    title: 'JS',
    collectValue: 50,
    timeToCollect: 120,
    upgradeCost: 100,
    upgradeRatio: 1.2,
    collectRatio: 1.5,
    developerConst: 300,
    isDeveloperHired: false,
    openComponentConst: 100,
    isComponentOpened: false,
    loadingImage: 'https://media.giphy.com/media/d6WWh3Em7kWHu/giphy.gif',
  }];

  onCollectTears($event) {
    this.tears += $event;
  }

  onUpgradeItem(item: ClickerConfigModel) {
    if (item.upgradeCost <= this.tears) {
      this.tears -= item.upgradeCost;
      this.upgradeItem(item);
    }
  }

  onHireDeveloper(item: ClickerConfigModel) {
    if (item.developerConst <= this.tears) {
     this.tears -= item.developerConst;
     item.isDeveloperHired = true;
    }
  }

  onByComponent(item: ClickerConfigModel) {
    if (item.openComponentConst <= this.tears) {
      this.tears -= item.openComponentConst;
      item.isComponentOpened = true;
    }
  }

  upgradeItem(item: ClickerConfigModel) {
    item.collectValue = Math.ceil(item.collectValue * item.collectRatio);
    item.upgradeCost = Math.ceil(item.upgradeCost * item.upgradeRatio);
  }
}
