import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JsonService } from './services/json.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  rootFolder: any;
  path = '';
  searchRequest = '';

  private querySubscription: Subscription| null = null;

  constructor(private jsonService: JsonService, private route: ActivatedRoute) {
    this.parseRoute();
  }

  async ngOnInit(): Promise<void> {
    this.rootFolder = await this.getJSON();
  }

  parseRoute(): void {
    // this.path = window.location.pathname;
    // // this.querySubscription = this.route.queryParams.subscribe((queryParam: any) => {
    // //   this.path = queryParam.path;
    // //   this.searchRequest = queryParam.searchRequest;
    // // });

    // Пока не удалось пробросить роут через ангуляр роут, но можно его поменять тут,
    // чтобы он пробросился чрезез @Input() в tree компонент
    this.path = 'desktop/documents/logs.txt';
  }

  async getJSON(): Promise<any> {
    return await this.jsonService.getJSON();
  }

  ngOnDestroy(): void {
    this.querySubscription?.unsubscribe();
  }
}
