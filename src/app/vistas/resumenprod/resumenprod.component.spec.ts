import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenprodComponent } from './resumenprod.component';

describe('ResumenprodComponent', () => {
  let component: ResumenprodComponent;
  let fixture: ComponentFixture<ResumenprodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumenprodComponent]
    });
    fixture = TestBed.createComponent(ResumenprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
