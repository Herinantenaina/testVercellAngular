import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoMechaComponent } from './appo-mecha.component';

describe('AppoMechaComponent', () => {
  let component: AppoMechaComponent;
  let fixture: ComponentFixture<AppoMechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppoMechaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppoMechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
