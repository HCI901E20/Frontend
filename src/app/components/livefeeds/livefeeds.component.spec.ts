import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivefeedsComponent } from './livefeeds.component';

describe('LivefeedsComponent', () => {
  let component: LivefeedsComponent;
  let fixture: ComponentFixture<LivefeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivefeedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivefeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
