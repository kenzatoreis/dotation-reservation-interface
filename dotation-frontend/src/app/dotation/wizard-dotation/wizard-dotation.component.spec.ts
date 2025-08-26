import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardDotationComponent } from './wizard-dotation.component';

describe('WizardDotationComponent', () => {
  let component: WizardDotationComponent;
  let fixture: ComponentFixture<WizardDotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardDotationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardDotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
