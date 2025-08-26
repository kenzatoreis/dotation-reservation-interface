import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotationFormComponent } from './dotation-form.component';

describe('DotationFormComponent', () => {
  let component: DotationFormComponent;
  let fixture: ComponentFixture<DotationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
