import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharescheduleComponent } from './shareschedule.component';

describe('SharescheduleComponent', () => {
  let component: SharescheduleComponent;
  let fixture: ComponentFixture<SharescheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharescheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharescheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
