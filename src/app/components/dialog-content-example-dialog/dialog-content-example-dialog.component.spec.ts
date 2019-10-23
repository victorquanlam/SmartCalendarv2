import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentExampleDialogComponent } from './dialog-content-example-dialog.component';

describe('DialogContentExampleDialogComponent', () => {
  let component: DialogContentExampleDialogComponent;
  let fixture: ComponentFixture<DialogContentExampleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContentExampleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentExampleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
