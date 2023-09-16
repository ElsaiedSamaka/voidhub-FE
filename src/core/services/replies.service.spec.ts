/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RepliesService } from './replies.service';

describe('Service: Replies', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepliesService]
    });
  });

  it('should ...', inject([RepliesService], (service: RepliesService) => {
    expect(service).toBeTruthy();
  }));
});
