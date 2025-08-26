import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConjointDotationComponent } from './form-conjoint-dotation.component';

describe('FormConjointDotationComponent', () => {
  let component: FormConjointDotationComponent;
  let fixture: ComponentFixture<FormConjointDotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormConjointDotationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConjointDotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
