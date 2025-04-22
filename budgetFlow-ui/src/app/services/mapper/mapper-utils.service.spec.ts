import { TestBed } from '@angular/core/testing';

import { MapperUtilsService } from './mapper-utils.service';

describe('MapperUtilsService', () => {
  let service: MapperUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapperUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
