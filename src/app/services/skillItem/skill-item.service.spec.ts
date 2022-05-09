import { TestBed } from '@angular/core/testing';

import { SkillItemService } from './skill-item.service';

describe('SkillItemService', () => {
  let service: SkillItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
