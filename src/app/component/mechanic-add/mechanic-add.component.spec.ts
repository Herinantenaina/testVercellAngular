import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicAddComponent } from './mechanic-add.component';

describe('MechanicAddComponent', () => {
  let component: MechanicAddComponent;
  let fixture: ComponentFixture<MechanicAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechanicAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
