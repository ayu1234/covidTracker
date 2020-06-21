import { TestBed } from '@angular/core/testing';

import { GetCovidStatsService } from './get-covid-stats.service';

describe('GetCovidStatsService', () => {
  let service: GetCovidStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCovidStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
