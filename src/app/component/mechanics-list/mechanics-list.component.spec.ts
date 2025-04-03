import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicsListComponent } from './mechanics-list.component';

describe('MechanicsListComponent', () => {
  let component: MechanicsListComponent;
  let fixture: ComponentFixture<MechanicsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechanicsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
