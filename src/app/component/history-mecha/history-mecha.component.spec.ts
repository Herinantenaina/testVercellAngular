import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMechaComponent } from './history-mecha.component';

describe('HistoryMechaComponent', () => {
  let component: HistoryMechaComponent;
  let fixture: ComponentFixture<HistoryMechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryMechaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryMechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
