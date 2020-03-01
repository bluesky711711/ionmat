import { TestBed } from '@angular/core/testing';

import { AppstatusService } from './appstatus.service';

describe('AppstatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppstatusService = TestBed.get(AppstatusService);
    expect(service).toBeTruthy();
  });
});
