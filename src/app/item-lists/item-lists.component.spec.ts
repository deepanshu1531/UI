import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListsComponent } from './item-lists.component';

describe('ItemListsComponent', () => {
  let component: ItemListsComponent;
  let fixture: ComponentFixture<ItemListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemListsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
