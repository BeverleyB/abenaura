import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Redirect404Component } from './redirect404.component';

describe('Redirect404Component', () => {
  let component: Redirect404Component;
  let fixture: ComponentFixture<Redirect404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Redirect404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Redirect404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
