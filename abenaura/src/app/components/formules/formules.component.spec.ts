import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulesComponent } from './formules.component';

describe('FormulesComponent', () => {
  let component: FormulesComponent;
  let fixture: ComponentFixture<FormulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
