import { TestBed, inject } from '@angular/core/testing';

import { TicketsServiceService } from './tickets-service.service';

describe('TicketsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketsServiceService]
    });
  });

  it('should be created', inject([TicketsServiceService], (service: TicketsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
