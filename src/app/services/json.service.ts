import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from '../config';

@Injectable()
export class JsonService {
  private jsonURL = CONFIG.jsonURL;

  constructor(private http: HttpClient) {}

  public async getJSON(): Promise<any> {
    return await this.http.get(this.jsonURL).toPromise();
  }
}
