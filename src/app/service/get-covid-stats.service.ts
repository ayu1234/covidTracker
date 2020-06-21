import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class GetCovidStatsService {

  constructor(private httpClient: HttpClient) { }

  getReport() {
    return this.httpClient.get("https://api.covid19india.org/data.json").pipe(map(data => data));
  }
  getStateReport() {
    return this.httpClient.get("https://api.covid19india.org/state_district_wise.json").pipe(map(data => data));
  }
  numberFacts() {
    return this.httpClient.get("http://numbersapi.com/76").pipe(map(data => data));
  }
}
