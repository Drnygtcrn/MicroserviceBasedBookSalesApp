import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegerlendirmeComponent } from './degerlendirme.component';

describe('DegerlendirmeComponent', () => {
  let component: DegerlendirmeComponent;
  let fixture: ComponentFixture<DegerlendirmeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DegerlendirmeComponent]
    });
    fixture = TestBed.createComponent(DegerlendirmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
