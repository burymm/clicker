import { Component } from '@angular/core';
import {ClickerConfigModel} from './shared/models/clicker.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clicker';
  configs: ClickerConfigModel[] = [{
    title: 'HTML',
    collectValue: 1,
    timeToCollect: 5,
    upgradeCost: 5,
  }, {
    title: 'CSS',
    collectValue: 10,
    timeToCollect: 60,
    upgradeCost: 50,
  }];
}
