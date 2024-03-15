import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeOnMapComponent } from './see-on-map.component';

describe('SeeOnMapComponent', () => {
  let component: SeeOnMapComponent;
  let fixture: ComponentFixture<SeeOnMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeOnMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeeOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
