import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastUserComponent } from './last-user.component';

describe('LastUserComponent', () => {
  let component: LastUserComponent;
  let fixture: ComponentFixture<LastUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
