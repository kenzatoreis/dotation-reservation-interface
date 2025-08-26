import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEnfantDotationComponent } from './form-enfant-dotation.component';

describe('FormEnfantDotationComponent', () => {
  let component: FormEnfantDotationComponent;
  let fixture: ComponentFixture<FormEnfantDotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEnfantDotationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEnfantDotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
