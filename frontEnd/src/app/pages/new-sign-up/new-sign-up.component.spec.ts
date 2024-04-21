import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSignUpComponent } from './new-sign-up.component';

describe('NewSignUpComponent', () => {
  let component: NewSignUpComponent;
  let fixture: ComponentFixture<NewSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSignUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
