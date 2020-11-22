import { TestBed, inject } from '@angular/core/testing';

import { ModalhelperService } from './modalhelper.service';

describe('ModalhelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalhelperService]
    });
  });

  it('should be created', inject([ModalhelperService], (service: ModalhelperService) => {
    expect(service).toBeTruthy();
  }));
});
