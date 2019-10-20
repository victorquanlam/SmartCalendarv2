import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTravelItineraryComponent } from './add-travel-itinerary.component';

describe('AddTravelItineraryComponent', () => {
  let component: AddTravelItineraryComponent;
  let fixture: ComponentFixture<AddTravelItineraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTravelItineraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTravelItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
