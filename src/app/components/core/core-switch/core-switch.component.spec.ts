import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreSwitchComponent } from './core-switch.component';

describe('CoreSwitchComponent', () => {
  let component: CoreSwitchComponent;
  let fixture: ComponentFixture<CoreSwitchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoreSwitchComponent]
    });
    fixture = TestBed.createComponent(CoreSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
