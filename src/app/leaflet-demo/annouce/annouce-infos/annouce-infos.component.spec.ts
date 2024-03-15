import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouceInfosComponent } from './annouce-infos.component';

describe('AnnouceInfosComponent', () => {
  let component: AnnouceInfosComponent;
  let fixture: ComponentFixture<AnnouceInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouceInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnouceInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
