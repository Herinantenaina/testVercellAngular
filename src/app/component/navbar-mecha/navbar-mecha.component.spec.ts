import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMechaComponent } from './navbar-mecha.component';

describe('NavbarMechaComponent', () => {
  let component: NavbarMechaComponent;
  let fixture: ComponentFixture<NavbarMechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarMechaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarMechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
