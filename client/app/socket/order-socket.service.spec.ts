import { TestBed } from '@angular/core/testing';

import { OrderSocketService } from './order-socket.service';

describe('OrderSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderSocketService = TestBed.get(OrderSocketService);
    expect(service).toBeTruthy();
  });
});
