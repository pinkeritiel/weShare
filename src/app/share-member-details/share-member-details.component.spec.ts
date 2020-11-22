import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareMemberDetailsComponent } from './share-member-details.component';

describe('ShareMemberDetailsComponent', () => {
  let component: ShareMemberDetailsComponent;
  let fixture: ComponentFixture<ShareMemberDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareMemberDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareMemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
