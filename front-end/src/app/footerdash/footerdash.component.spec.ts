import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterdashComponent } from './footerdash.component';

describe('FooterdashComponent', () => {
  let component: FooterdashComponent;
  let fixture: ComponentFixture<FooterdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterdashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
