import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareCreateComponent } from './share-create.component';

describe('ShareCreateComponent', () => {
  let component: ShareCreateComponent;
  let fixture: ComponentFixture<ShareCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
