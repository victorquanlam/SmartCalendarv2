import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTravelItineraryComponent } from './eidt-travel-itinerary.component';

describe('EditTravelItineraryComponent', () => {
  let component: EditTravelItineraryComponent;
  let fixture: ComponentFixture<EditTravelItineraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTravelItineraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTravelItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
