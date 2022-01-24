import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRestriccionComponent } from './crear-restriccion.component';

describe('CrearRestriccionComponent', () => {
  let component: CrearRestriccionComponent;
  let fixture: ComponentFixture<CrearRestriccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearRestriccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRestriccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
