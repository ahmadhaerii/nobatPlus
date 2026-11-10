import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreBtnComponent } from './core-btn.component';

describe('CoreBtnComponent', () => {
  let component: CoreBtnComponent;
  let fixture: ComponentFixture<CoreBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoreBtnComponent]
    });
    fixture = TestBed.createComponent(CoreBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
