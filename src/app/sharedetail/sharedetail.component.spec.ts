import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedetailComponent } from './sharedetail.component';

describe('SharedetailComponent', () => {
  let component: SharedetailComponent;
  let fixture: ComponentFixture<SharedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
