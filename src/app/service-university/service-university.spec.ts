import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceUniversity } from './service-university';

describe('ServiceUniversity', () => {
  let component: ServiceUniversity;
  let fixture: ComponentFixture<ServiceUniversity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceUniversity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceUniversity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
