import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareMemberComponent } from './share-member.component';

describe('ShareMemberComponent', () => {
  let component: ShareMemberComponent;
  let fixture: ComponentFixture<ShareMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
