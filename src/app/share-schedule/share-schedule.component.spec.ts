import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareScheduleComponent } from './share-schedule.component';

describe('ShareScheduleComponent', () => {
  let component: ShareScheduleComponent;
  let fixture: ComponentFixture<ShareScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
