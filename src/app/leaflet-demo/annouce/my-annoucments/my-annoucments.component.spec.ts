import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAnnoucmentsComponent } from './my-annoucments.component';

describe('MyAnnoucmentsComponent', () => {
  let component: MyAnnoucmentsComponent;
  let fixture: ComponentFixture<MyAnnoucmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAnnoucmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyAnnoucmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
