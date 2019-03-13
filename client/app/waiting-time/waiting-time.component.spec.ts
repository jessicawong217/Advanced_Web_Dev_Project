import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingTimeComponent } from './waiting-time.component';

describe('WaitingTimeComponent', () => {
  let component: WaitingTimeComponent;
  let fixture: ComponentFixture<WaitingTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
