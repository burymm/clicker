import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {ClickerConfigModel} from '../shared/models/clicker.model';

@Component({
  selector: 'app-clicker-item',
  templateUrl: './clicker-item.component.html',
  styleUrls: ['./clicker-item.component.scss']
})
export class ClickerItemComponent implements OnInit, OnDestroy {
  @Input()
  config: ClickerConfigModel;

  @Input()
  isCanUpgrade = false;

  @Input()
  isCanHireDeveloper = false;

  @Input()
  isCanBuyComponent = false;

  @Output()
  collectTears: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  upgradeItem: EventEmitter<ClickerConfigModel> = new EventEmitter<ClickerConfigModel>();

  @Output()
  hireDeveloper: EventEmitter<ClickerConfigModel> = new EventEmitter<ClickerConfigModel>();

  @Output()
  buyComponent: EventEmitter<ClickerConfigModel> = new EventEmitter<ClickerConfigModel>();

  initTime = Date.now();
  interval;
  now = Date.now();
  collected = 0;
  isBuying = false;

  constructor() { }

  ngOnInit() {
    this.interval = setInterval(() => { this.tick(); }, 1000);
  }

  tick() {
    this.now = Date.now();
    if (this.isBuying) {
      this.initTime = Date.now();
      this.isBuying = false;
    }
    if (this.config.isDeveloperHired && this.loadingPercent === 100) {
      this.collect();
    }
  }

  get loadingPercent() {
    if (!this.config.isComponentOpened || this.isBuying) {
      return 0;
    }
    const diff = (this.now - this.initTime) / 1000;
    return diff / this.config.timeToCollect * 100 < 100 ? diff / this.config.timeToCollect * 100 : 100;
  }

  collect() {
    this.initTime = Date.now();
    this.tick();
    this.collected += 1;
    this.collectTears.emit(this.config.collectValue);
    console.log('collecting from', this.config.title);
  }

  onBuyComponent() {
    this.buyComponent.emit(this.config);
    this.isBuying = true;
  }

  onHireDeveloper() {
    this.hireDeveloper.emit(this.config);
  }

  upgrade() {
    this.upgradeItem.emit(this.config);
  }

  isCanCollect() {
    return this.loadingPercent >= 100;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
