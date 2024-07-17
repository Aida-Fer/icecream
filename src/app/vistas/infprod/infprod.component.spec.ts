import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfprodComponent } from './infprod.component';

describe('InfprodComponent', () => {
  let component: InfprodComponent;
  let fixture: ComponentFixture<InfprodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfprodComponent]
    });
    fixture = TestBed.createComponent(InfprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
