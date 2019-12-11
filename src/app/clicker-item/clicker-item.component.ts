import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ClickerConfigModel} from '../shared/models/clicker.model';

@Component({
  selector: 'app-clicker-item',
  templateUrl: './clicker-item.component.html',
  styleUrls: ['./clicker-item.component.scss']
})
export class ClickerItemComponent implements OnInit, OnDestroy {
  @Input()
  config: ClickerConfigModel;
  initTime = Date.now();
  interval;
  now = Date.now();
  collected = 0;

  constructor() { }

  ngOnInit() {
    this.interval = setInterval(() => { this.tick(); }, 1000);
  }

  tick() {
    this.now = Date.now();
  }

  get loadingPercent() {
    const diff = (this.now - this.initTime) / 1000;
    return diff / this.config.timeToCollect * 100 < 100 ? diff / this.config.timeToCollect * 100 : 100;
  }

  collect() {
    this.initTime = Date.now();
    this.tick();
    this.collected += 1;
    console.log('collecting from', this.config.title);
  }

  isCanCollect() {
    return this.loadingPercent >= 100;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
