import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnnouceComponent } from './create-annouce.component';

describe('CreateAnnouceComponent', () => {
  let component: CreateAnnouceComponent;
  let fixture: ComponentFixture<CreateAnnouceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAnnouceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAnnouceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
