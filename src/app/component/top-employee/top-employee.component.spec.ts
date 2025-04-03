import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopEmployeeComponent } from './top-employee.component';

describe('TopEmployeeComponent', () => {
  let component: TopEmployeeComponent;
  let fixture: ComponentFixture<TopEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
