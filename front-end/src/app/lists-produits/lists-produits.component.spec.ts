import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsProduitsComponent } from './lists-produits.component';

describe('ListsProduitsComponent', () => {
  let component: ListsProduitsComponent;
  let fixture: ComponentFixture<ListsProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsProduitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
